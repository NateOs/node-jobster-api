const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");

const getAllJobs = async (req, res) => {
  res.send("get all jobs");
};
const getJob = async (req, res) => {
  res.send("get job");
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
