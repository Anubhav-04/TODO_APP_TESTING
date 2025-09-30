const request = require('supertest')
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose')
const app = require('../../server')

const Todo = require('../../models/todoModels.js');

describe("Todo Api integration Test", () =>{
   let mongoServer;
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.disconnect();
        await mongoose.connect(mongoUri);
    });
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    describe("Get api/get_todo",()=>{
        it("It should return all the todos",async()=>{
            await Todo.create({title:"Todo 1"})
            await Todo.create({title:"Todo 2"})
            const response = await request(app).get("/api/get_todo")
            expect(response.status).toBe(200)
        })
    })

    describe('POST /add_todo', () => {
        it('should add a todo and return it', async () => {
        const response = await request(app)
        .post('/api/add_todo')
        .send({ todo: "Adding new todo" });
        console.log(response.body)
        expect(response.status).toBe(200);
        expect(response.body.title).toBe("Adding new todo");
        expect(response.body.completed).toBe(false);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('title', 'Adding new todo');
        expect(response.body).toHaveProperty('completed', false);
        
});
})
});


