import { NextResponse } from "next/server";
import rebatesData from "@/data/rebates.json";

const ONESIGNAL_APP_ID = "db430d31-363a-4eb6-8400-9dc25fd978b4";
const ONESIGNAL_API_KEY = process.env.ONESIGNAL_API_KEY;

// Verify cron secret to prevent unauthorized access
const CRON_SECRET = process.env.CRON_SECRET;

interface NotificationPayload {
  app_id: string;
  headings: { en: string; es: string };
  contents: { en: string; es: string };
  filters?: Array<{ field: string; key?: string; value: string; relation?: string }>;
  url?: string;
}

async function sendNotification(payload: NotificationPayload) {
  if (!ONESIGNAL_API_KEY) {
    console.error("ONESIGNAL_API_KEY not configured");
    return null;
  }

  const response = await fetch("https://onesignal.com/api/v1/notifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Basic ${ONESIGNAL_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  return response.json();
}

function getDaysUntilExpiry(endDate: string): number {
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = end.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export async function GET(request: Request) {
  // Verify authorization
  const authHeader = request.headers.get("authorization");
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results: Array<{ rebate: string; country: string; daysLeft: number; result: any }> = [];
  const notifyDays = [7, 3, 1];

  for (const rebate of rebatesData.rebates) {
    const daysLeft = getDaysUntilExpiry(rebate.endDate);

    if (!notifyDays.includes(daysLeft)) continue;

    // Map category to interest tag
    const interestMap: Record<string, string> = {
      heaters: "heaters",
      pumps: "pumps",
      filters: "filters",
      lighting: "lighting",
      chlorinators: "chlorinators",
    };
    const interestTag = interestMap[rebate.category] || rebate.category;

    for (const countryCode of rebate.countries) {
      // Build message
      let emoji = "⏰";
      let urgencyEs = `${daysLeft} días restantes`;
      let urgencyEn = `${daysLeft} days remaining`;

      if (daysLeft === 1) {
        emoji = "🚨";
        urgencyEs = "¡ÚLTIMO DÍA!";
        urgencyEn = "LAST DAY!";
      } else if (daysLeft === 3) {
        emoji = "⚠️";
        urgencyEs = `¡Solo ${daysLeft} días!`;
        urgencyEn = `Only ${daysLeft} days left!`;
      }

      const result = await sendNotification({
        app_id: ONESIGNAL_APP_ID,
        headings: {
          en: `${emoji} ${rebate.name} - ${urgencyEn}`,
          es: `${emoji} ${rebate.name} - ${urgencyEs}`,
        },
        contents: {
          en: `Rebate $${rebate.rebateAmount} USD expires soon. Don't miss out!`,
          es: `Rebate $${rebate.rebateAmount} USD termina pronto. ¡No te lo pierdas!`,
        },
        filters: [
          { field: "tag", key: "country", value: countryCode, relation: "=" },
        ],
        url: `https://pentairlatam.com/tabla`,
      });

      results.push({
        rebate: rebate.name,
        country: countryCode,
        daysLeft,
        result,
      });

      // Rate limiting
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }

  return NextResponse.json({
    success: true,
    checked: rebatesData.rebates.length,
    notificationsSent: results.length,
    details: results,
  });
}
