const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

const multer = require('multer');
const upload = multer({
	dest: 'images',
	limits: {
		fileSize: 1000000,
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(doc|docx)$/)) {
			return cb(new Error('Please upload a Word document'));
		}

		// cb(new Error('File type not supported'));
		cb(undefined, true);
		// cd(undefined, false);
	},
});

const errorMiddleware = (req, res, next) => {
	throw new Error('From my middleware');
};

app.post(
	'/upload',
	upload.single('upload'),
	(req, res) => {
		res.send('Uploaded');
	},
	(error, req, res, next) => {
		res.status(400).send({ error: error.message });
	}
);

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// RUN APP
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
