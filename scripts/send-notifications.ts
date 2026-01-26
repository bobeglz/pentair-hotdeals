/**
 * Automated notification script for Pentair Hot Deals
 * Run daily via cron to send reminders about expiring rebates
 */

import rebatesData from "../data/rebates.json";

const ONESIGNAL_APP_ID = "db430d31-363a-4eb6-8400-9dc25fd978b4";
const ONESIGNAL_API_KEY = process.env.ONESIGNAL_API_KEY!;

interface Notification {
  headings: { en: string; es: string };
  contents: { en: string; es: string };
  filters?: Array<{ field: string; key?: string; value: string; relation?: string }>;
  included_segments?: string[];
  url?: string;
}

async function sendNotification(notification: Notification) {
  const response = await fetch("https://onesignal.com/api/v1/notifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Basic ${ONESIGNAL_API_KEY}`,
    },
    body: JSON.stringify({
      app_id: ONESIGNAL_APP_ID,
      ...notification,
    }),
  });

  const result = await response.json();
  console.log("Notification sent:", result);
  return result;
}

function getDaysUntilExpiry(endDate: string): number {
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

async function checkAndNotify() {
  const today = new Date().toISOString().split("T")[0];
  console.log(`Running notification check for ${today}`);

  for (const rebate of rebatesData.rebates) {
    const daysLeft = getDaysUntilExpiry(rebate.endDate);
    const category = rebatesData.categories.find(c => c.id === rebate.category);
    const categoryName = category?.name || rebate.category;

    // Map category to interest tag
    const interestMap: Record<string, string> = {
      "heaters": "heaters",
      "pumps": "pumps", 
      "filters": "filters",
      "lighting": "lighting",
      "chlorinators": "chlorinators",
    };
    const interestTag = interestMap[rebate.category] || rebate.category;

    // Notify at 7 days, 3 days, and last day
    const notifyDays = [7, 3, 1];
    
    if (notifyDays.includes(daysLeft)) {
      console.log(`Rebate "${rebate.name}" expires in ${daysLeft} days`);

      // Create filters for each country this rebate applies to
      for (const countryCode of rebate.countries) {
        const countryData = rebatesData.countries.find(c => c.code === countryCode);
        const countryName = countryData?.name || countryCode;

        // Build message based on days left
        let emoji = "⏰";
        let urgencyEs = "";
        let urgencyEn = "";
        
        if (daysLeft === 1) {
          emoji = "🚨";
          urgencyEs = "¡ÚLTIMO DÍA!";
          urgencyEn = "LAST DAY!";
        } else if (daysLeft === 3) {
          emoji = "⚠️";
          urgencyEs = `¡Solo ${daysLeft} días!`;
          urgencyEn = `Only ${daysLeft} days left!`;
        } else {
          urgencyEs = `${daysLeft} días restantes`;
          urgencyEn = `${daysLeft} days remaining`;
        }

        await sendNotification({
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
            { field: "tag", key: "interests", value: interestTag, relation: "contains" },
          ],
          url: `https://pentairlatam.com/tabla?highlight=${rebate.id}`,
        });

        // Small delay between notifications
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  }

  console.log("Notification check complete");
}

// Run the check
checkAndNotify().catch(console.error);
