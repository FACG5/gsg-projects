const express = require('express');

const home = require('./webSiteHome');
const cohortWebsite = require('./cohortWebsite');
const projectsPage = require('./projectsPage');
const projectPageWebsite = require('./projectPageWebsite');
const cohortPageWebsite = require('./cohortPageWebsite');
const login = require('./login');
const error = require('./error');
const adminHomePage = require('./adminHomePage');
const cohorts = require('./cohorts');
const editcohort = require('./editCohort');
const students = require('./students');
const { authCheck } = require('./middleware');
const adminProjectsPage = require('./adminProjectsPage');
const projects = require('./projects');
const studentsProject = require('./studentsProject');

const router = express.Router();

router.get('/', home.get);
router.get('/cohort', cohortWebsite.get);
router.get('/projects/:projectsType', projectsPage.get);
router.get('/project/:id', projectPageWebsite.get);
router.get('/cohortPageWebsite/:id', cohortPageWebsite.get);

router.get('/admin/login', login.get);
router.post('/admin/login', login.post);

router.get('/admin', authCheck, adminHomePage.getStatistics, adminHomePage.get);
router.get('/admin/logout', authCheck, adminHomePage.logout);
router.get('/admin/cohorts', authCheck, cohorts.get);
router.post('/admin/cohorts', authCheck, cohorts.addCohort);
router.delete('/admin/cohorts', authCheck, cohorts.deleteCohort);
router.get('/admin/cohorts/edit/:id', authCheck, editcohort.getCohortData);
router.post('/admin/cohorts/edit/:id', authCheck, editcohort.editCohort);
router.post('/admin/cohorts/:cohortId/newStudent', authCheck, students.post);
router.get('/admin/cohorts/:cohortId/students', authCheck, cohorts.getStudents);
router.post('/admin/cohorts/:cohortId/newStudent', authCheck, students.post);
router.delete('/admin/cohorts/:cohortId/deleteStudent', authCheck, students.delete);
router.put('/admin/cohorts/:cohortId/editStudent/:id', authCheck, students.put);
router.get('/admin/cohorts/:cohortId/editStudent/:id', authCheck, students.editPage);
router.get('/admin/:projectsType', authCheck, adminProjectsPage.get);
router.get('/admin/:projectsType/:cohortId/projects', authCheck, adminProjectsPage.getProjects);
router.post('/admin/:projectsType/:cohortId/newProject', authCheck, projects.post);
router.delete('/admin/:projectsType/:cohortId/deleteProject', authCheck, projects.delete);
router.get('/admin/:projectsType/:cohortId/edit/:projectId', authCheck, projects.getProject);
router.post('/admin/:projectsType/:cohortId/edit/:projectId', authCheck, projects.edit);
router.get('/admin/:projectsType/:id/projects/student/:cohortId', authCheck, studentsProject.get);
router.delete('/admin/:projectsType/:id/projects/student/:cohortId', authCheck, studentsProject.deleteStudentProject);
router.post('/admin/:projectsType/:id/projects/student/:cohortId', authCheck, studentsProject.addStudentProject);


router.use(error.client);
router.use(error.server);

module.exports = router;
