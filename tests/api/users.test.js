import axios from "axios";
import { expect }  from "chai";

const baseURL = 'https://reqres.in/api'

export default describe('User tests', ()=>{

    it('should list users on page 2', async()=>{
        const response = await axios.get(`${baseURL}/users?page=2`, {
            headers: {
               "x-api-key": "reqres-free-v1" 
            }
        })
        expect(response.status).to.equal(200)
        expect(response.data.page).to.equal(2)
        expect(response.data.data).to.be.an('array').that.is.not.empty
    })

    it('should fetch user using id', async ()=>{
        const response = await axios.get(`${baseURL}/users/3`, {
            headers: {
               "x-api-key": "reqres-free-v1" 
            }
        })
        expect(response.status).to.equal(200)
        expect(response.data.data.id).to.equal(3)
    })

    it('should delete user using id', async()=>{
        const response = await axios.delete(`${baseURL}/users/3`, {
            headers: {
               "x-api-key": "reqres-free-v1" 
            }
        })
        expect(response.status).to.equal(204)
    })
})