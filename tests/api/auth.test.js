import axios from "axios";
import { expect }  from "chai";

const baseURL = 'https://reqres.in/api';


export default describe('Authentication tests', ()=>{
    it('should register user using valid credentials', async ()=>{
        const response = await axios.post(`${baseURL}/register`, {
            "email": "eve.holt@reqres.in",
            "password": "pistol"
        }, {headers: {
            "x-api-key" : "reqres-free-v1"
        }})

        expect(response.status).to.equal(200)
        expect(response.data).to.have.property('id')
        expect(response.data).to.have.property('token')
    })
        
    it('should fail to register user without password', async () => {
        try {
            await axios.post(`${baseURL}/register`, {
            "email": "eve.holt@reqres.in"
            }, {headers: {
                "x-api-key" : "reqres-free-v1"
            }});
        } catch (error) {
            expect(error.response.status).to.equal(400);
            expect(error.response.data.error).to.equal("Missing password");
        }
    });

    it('should login successfully', async () => {
        const response = await axios.post(`${baseURL}/login`, {
        "email": "eve.holt@reqres.in",
        "password": "pistol"
        }, {headers: {
            "x-api-key" : "reqres-free-v1"
        }});

        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('token');
    });

    it('should fail login with missing password', async () => {
        try {
            await axios.post(`${baseURL}/login`, {
            "email": "eve.holt@reqres.in"
            }, {headers: {
                "x-api-key" : "reqres-free-v1"
            }});
        } catch (error) {
            expect(error.response.status).to.equal(400);
            expect(error.response.data.error).to.equal("Missing password");
        }
    });
})