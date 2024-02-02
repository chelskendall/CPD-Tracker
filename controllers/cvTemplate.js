const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
// academic, endorse
const AcademicQual = require('../models/academicQual'); //order
//const Endorsements = require('../models/endorsements'); //address
const User = require('../models/user');

const findAll = async (req, res) => {
  const academic = await AcademicQual.find({}).sort({ createdAt: -1 }).exec();
  return res.json({ data: academic });
};

const findOne = async (req, res) => {
  const academic = await AcademicQual.findById(req.params.id);
  return res.json({ data: academic });
};

/*find among the CVs the one whose id matches with the one passed in the URL as a parameter, 
then pass the CV found as the data to render the page */
const viewOrder = async (req, res) => {
  const academic = await AcademicQual.findOne({ _id: req.params.id })
  //populate() retrieves the document with all its properties instead of just the ObjectId.
    .populate({ path: 'establishment', model: AcademicQual })
    .populate({ path: 'courseTitle', model: AcademicQual })
    .populate({ path: 'user', model: User })
    .exec();
  //const subTotal = order.totalAmount - (order.shippingAmount + order.taxAmount);
  res.render('invoice', { academic: academic?.toJSON() });
};

const downloadOrder = async (req, res) => {
  const academic = await AcademicQual.findOne({ _id: req.params.id });
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const url = `${baseUrl}/orders/${req.params.id}/view`;
  const filePath = path.resolve(__dirname, `../../uploads/ORDER-${academic?.idAcademic}.pdf`); 
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.pdf({ path: filePath, format: 'a4', printBackground: true });
  await browser.close();
  res.download(filePath);
};

module.exports = { findAll, findOne, viewOrder, downloadOrder };


