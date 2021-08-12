const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const { 
    userOneId, 
    userOne, 
    userTwoId, 
    userTwo,
    taskOne,
    taskTwo,
    taskThree, 
    setupDatabase 
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'Dummy task test'
        })
        .expect(201)

    // Assert the task saved in database
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    // Assert the default value for completed
    expect(task.completed).toEqual(false)
})

test('Should fetch user task', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    // Assert the length of the task for the valid user is correct
    expect(response.body.length).toEqual(2)
})

test('Should not delete other users task', async () => {
    const response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
    
    // Assert the task is still in the database
    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})