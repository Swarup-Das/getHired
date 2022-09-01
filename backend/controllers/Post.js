import Post from "../models/Post.js";

// Post a new opening
export const postAJob = async (req, res) => {
  const { company, jobTitle, jobDescription, skills, salary, jobType } =
    req.body;
  const newPost = new Post({
    userId: req.user._id,
    company,
    jobTitle,
    jobDescription,
    skills,
    salary,
    jobType,
  });

  // console.log(newPost);
  try {
    const createdPost = await newPost.save();
    res.status(200).json({
      error: false,
      createdPost,
    });
  } catch (err) {
    return res.status(500).json({ error: true, message: err });
  }
};

// get jobs by job id

export const getPostByPostId = (req, res) => {
  // console.log(req.params.postId);
  Post.findById(req.params.postId)
    .populate("appliedUsers")
    .exec((err, post) => {
      if (err) {
        return res.status(404).json({
          error: true,
          message: err,
        });
      }
      return res.status(200).json({
        error: false,
        post,
      });
    });
};

// fetching all the posts from db
export const getAllJobs = async (req, res) => {
  const data = await Post.find().populate("userId");
  res.json(data);
};

//get jobs by user id

export const getPostsByUserId = (req, res) => {
  // console.log(req.params);
  // console.log("hiii");
  Post.find({ userId: req.params.userId })
    .populate("appliedUsers")
    .exec((err, postsByUser) => {
      if (err) {
        return res.status(404).json({
          error: true,
          message: err,
        });
      }

      return res.status(200).json({
        error: false,
        postsByUser,
      });
    });
};

// search jobs by skill
export const searchJobsBySkill = async (req, res) => {
  const relevantJobs = await Post.find({
    skills: { $in: [req.body.skill] },
  });
  res.status(200).json(relevantJobs);
};

// search jobs by company
export const searchJobsByCompany = async (req, res) => {
  const relevantJobs = await Post.find({
    company: req.params.company,
  });
  res.status(200).json(relevantJobs);
};

// delete job
export const deleteAjob = async (req, res) => {
  const job = await Post.findById(req.params.id);
  // console.log(job.userId)
  // console.log(req.user._id)
  if (job && job.userId.equals(req.user._id)) {
    const deletedJob = await job.remove();
    res.status(200).json(deletedJob);
  } else {
    res.status(501).json({ msg: "Not authorized" });
  }
};

// update a post
export const updateAjob = async (req, res) => {
  const job = await Post.findById(req.params.id);

  if (job && job.userId.equals(req.user._id)) {
    job.company = req.body.company;
    job.jobTitle = req.body.jobTitle;
    job.jobDescription = req.body.jobDescription;
    job.skills = req.body.skills;
    job.salary = req.body.salary;
    job.jobType = req.body.jobType;

    const updatedPost = await job.save();
    res.status(200).json(updatedPost);
  } else {
    res.status(501).json({ msg: "Not authorized" });
  }
};
