import Post from "../models/Post.js";

export const applyJobByJobId = async (req, res) => {
  const { jobId, userId } = req.query;
  const userIdFromJwtDecode = req.user._id;

  console.log(req.query);

  if (toString(userId) != toString(userIdFromJwtDecode))
    return res.status(403).json({ error: true, message: "Access Denied" });

  try {
    let post = await Post.findById(jobId);
    if (!post)
      return res
        .status(404)
        .json({ error: true, message: "No job found sorry :(" });

    post.appliedUsers.map((existingApplicant) => {
      if (existingApplicant.equals(userId)) {
        return res.status(400).json({
          error: true,
          message: "You have already applied for that position",
        });
      }
    });
    post.appliedUsers.push(userId);

    const postAfterUserApplied = await post.save();
    return res
      .status(200)
      .json({ error: false, message: "You have applied successfully !" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: true, message: "something went wrong :(" });
  }
};

export const cancelApplication = async (req, res) => {
  const { jobId, userId } = req.query;
  const userIdFromJwtDecode = req.user._id;

  if (userId != userIdFromJwtDecode)
    return res.status(403).json({ error: true, message: "Access Denied" });

  try {
    let post = await Post.findById(jobId);

    if (!post)
      return res
        .status(404)
        .json({ error: true, message: "No job found sorry :(" });

    let updatedUserList = [];
    let userIdFound = false;
    //user has applied or not previously
    post.appliedUsers.forEach((element) => {
      if (!element.equals(userId)) {
        updatedUserList.push(element);
      } else {
        userIdFound = true;
      }
    });

    if (userIdFound == false)
      return res.status(404).json({
        error: false,
        message: "You haven't applied for this position",
      });

    post.appliedUsers = updatedUserList;

    const postAfterUserApplied = await post.save();
    return res
      .status(200)
      .json({ error: false, message: "Application cancelled successfully !" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: true, message: "something went wrong :(" });
  }
};
