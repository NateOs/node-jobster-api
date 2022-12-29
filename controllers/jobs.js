const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

// get all jobs
const getAllJobs = async (req, res) => {
  const allJobs = await Job.find({ createdBy: req.user.userId }).sort(
    "createdAt",
  );
  res.status(StatusCodes.OK).json({ allJobs, count: allJobs.length });
};

// get a new job with id and createdBy
const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req; //* nested destructuring obj

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) {
    throw new NotFoundError(`Job ${jobId} not found`);
  }

  res.status(StatusCodes.OK).json({ job });
};

// create a new job
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId; // added user id to req.body for identification
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  res.send("update job");
};

const deleteJob = async (req, res) => {
  res.send("delete job");
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
