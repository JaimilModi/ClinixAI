import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
  try {
    const { userId } = await req.auth();

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await clerkClient.users.getUser(userId);
    const userPlan = user.privateMetadata.plan || "free";

    req.free_usage = Infinity;
    req.plan = userPlan;

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
