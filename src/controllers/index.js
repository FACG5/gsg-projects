const express = require('express');

const login = require('./login');
const error = require('./error');
const adminHomePage = require('./adminHomePage');
const cohorts = require('./cohorts');
const students = require('./Students');
const { authCheck } = require('./middleware');

const router = express.Router();

router.get('/admin/login', login.get);
router.post('/admin/login', login.post);

router.get('/admin', authCheck, adminHomePage.get);
router.get('/admin/logout', authCheck, adminHomePage.logout);
router.get('/admin/cohorts', authCheck, cohorts.get);
router.post('/admin/cohorts', authCheck, cohorts.addCohort);
router.delete('/admin/cohorts', authCheck, cohorts.deleteCohort);
router.get('/admin/cohorts/:cohortId/students', authCheck, cohorts.getStudents);
router.post('/admin/cohorts/:cohortId/newStudent', authCheck, students.post);
router.delete('/admin/cohorts/:cohortId/deleteStudent', authCheck, students.delete);
router.delete('/admin/cohorts/:cohortId/editStudent', authCheck, students.put);

router.use(error.client);
router.use(error.server);

module.exports = router;
