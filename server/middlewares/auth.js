import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
  try {
    const { userId } = await req.auth();

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await clerkClient.users.getUser(userId);

    // Read plan & usage from private metadata
    const userPlan = user.privateMetadata.plan || "free"; // default to free
    let freeUsage = user.privateMetadata.free_usage ?? 5; // example: 5 free requests

    if (userPlan === "premium") {
      // Premium users don't have usage limits
      freeUsage = 0;
    } else {
      // Free users -> track usage
      req.free_usage = freeUsage;

      if (freeUsage <= 0) {
        return res.status(403).json({
          success: false,
          message: "Free usage limit reached. Upgrade to premium.",
        });
      }

      // Decrease usage count
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          ...user.privateMetadata,
          free_usage: freeUsage - 1,
        },
      });
    }

    req.plan = userPlan;
    req.free_usage = freeUsage;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
