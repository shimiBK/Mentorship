const request = require("supertest");
const app = require("../server");



describe('Codeblock Test', () =>{

it('GET /codeblock/:id ---> get specific block', async () =>{
    return request(app).get('/api/codeblocks/1')
    .expect('Content-Type', /json/)
    .expect(200)
    .then((res)=>{
        expect(res.body).toEqual(
            expect.objectContaining({
                __v: expect.any(Number),
                _id: expect.any(String),
                id: expect.any(Number),
                code: expect.any(String),
                solution: expect.any(String)

            })
        );
    })
})


it('GET /codeblock/:id ---> 404 if block not found', async () =>{
    return request(app).get('/api/codeblocks/5')
    .expect('Content-Type', /json/)
    .expect(404)
    .then((res)=>{
        expect(res.body).toEqual(
            expect.objectContaining({
                message: expect.any(String),
                stack : expect.any(String),
                status: expect.any(Number),
                success : expect.any(Boolean),
            })
        );
    })
})

});



describe('Codeblocks Test', () =>{

    it('GET /codeblocks ---> get all codeblocks', async () =>{
        return request(app).get('/api/codeblocks/')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) =>{
            expect(res.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        __v: expect.any(Number),
                        _id: expect.any(String),
                        id: expect.any(Number),
                        code: expect.any(String),
                        solution: expect.any(String),
                        title: expect.any(String),
                    }),
                ])
            );

        });
    })
    
    
    });