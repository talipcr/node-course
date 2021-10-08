const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const {
	userOneId,
	userOne,
	userTwoId,
	userTwo,
	taskOne,
	taskTwo,
	taskThree,
	setupDatabase,
} = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create task for user', async () => {
	const response = await request(app)
		.post('/tasks')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			description: 'From test',
		})
		.expect(201);

	const task = await Task.findById(response.body._id);
	expect(task).not.toBeNull();
	expect(task.completed).toEqual(false);
});

test('Should fetch user tasks', async () => {
	const response = await request(app)
		.get('/tasks')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200);

	expect(response.body.length).toEqual(2);
});

test('Should not delete other users tasks', async () => {
	const response = await request(app)
		.delete(`/tasks/${taskOne._id}`)
		.set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
		.send()
		.expect(404);

	const task = await Task.findById(taskOne._id);
	expect(task).not.toBeNull();
});

// Should not create task with invalid description/completed
test('Should not create task with invalid description/completed', async () => {
	await request(app)
		.post('/tasks')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			description: '',
			completed: true,
		})
		.expect(400);
});

// Should not update task with invalid description/completed
test('Should not update task with invalid description/completed', async () => {
	await request(app)
		.patch(`/tasks/${taskOne._id}`)
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			description: '',
			completed: true,
		})
		.expect(400);
});
// Should delete user task
test('Should delete user task', async () => {
	await request(app)
		.delete(`/tasks/${taskOne._id}`)
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200);

	const task = await Task.findById(taskOne._id);
	expect(task).toBeNull();
});

// Should not delete task if unauthenticated
test('Should not delete task if unauthenticated', async () => {
	await request(app).delete(`/tasks/${taskOne._id}`).send().expect(401);

	const task = await Task.findById(taskOne._id);
	expect(task).not.toBeNull();
});

// Should not update other users task
test('Should not update other users task', async () => {
	await request(app)
		.patch(`/tasks/${taskOne._id}`)
		.set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
		.send({
			description: 'From test',
			completed: true,
		})
		.expect(404);

	const task = await Task.findById(taskOne._id);
	expect(task).not.toBeNull();
});

// Should fetch user task by id
test('Should fetch user task by id', async () => {
	// const response = await request(app)
	// 	.get(`/tasks/${taskOne._id}`)
	// 	.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
	// 	.send()
	// 	.expect(200);
	// expect(response.body).toMatchObject({
	// 	_id: taskOne._id.toHexString(),
	// 	description: taskOne.description,
	// 	completed: taskOne.completed,
	// 	owner: taskOne.owner,
	// });
});

// Should not fetch user task by id if unauthenticated
test('Should not fetch user task by id if unauthenticated', async () => {
	await request(app).get(`/tasks/${taskOne._id}`).send().expect(401);
});

// Should not fetch other users task by id
test('Should not fetch other users task by id', async () => {
	await request(app)
		.get(`/tasks/${taskOne._id}`)
		.set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
		.send()
		.expect(404);
});

// Should fetch only completed tasks
test('Should fetch only completed tasks', async () => {
	const response = await request(app)
		.get('/tasks?completed=true')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200);

	expect(response.body.length).toEqual(1);
});
// Should fetch only incomplete tasks
test('Should fetch only incomplete tasks', async () => {
	const response = await request(app)
		.get('/tasks?completed=false')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200);

	expect(response.body.length).toEqual(1);
});

// Should sort tasks by description/completed/createdAt/updatedAt
test('Should sort tasks by description/completed/createdAt/updatedAt', async () => {
	await request(app)
		.post('/tasks')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			description: 'From test',
			completed: true,
		})
		.expect(201);

	const response = await request(app)
		.get('/tasks?sortBy=description')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200);

	expect(response.body[0].description).toEqual(taskOne.description);
	expect(response.body[1].description).toEqual('From test');
});

// Should fetch page of tasks
test('Should fetch page of tasks', async () => {
	await request(app)
		.post('/tasks')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send({
			description: 'From test',
			completed: true,
		})
		.expect(201);

	const response = await request(app)
		.get('/tasks?limit=1&skip=1')
		.set('Authorization', `Bearer ${userOne.tokens[0].token}`)
		.send()
		.expect(200);

	expect(response.body.length).toEqual(1);
	expect(response.body[0].description).toEqual(taskTwo.description);
});
