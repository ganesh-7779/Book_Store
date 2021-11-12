const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const data = require("./data.json");
const faker = require("faker");
chai.should();
chai.use(chaiHttp);
// describe("Get All Book API", () => {
//     it("WhenGiven_InfoCorrect_AllBookShould_ReturnSuccessfully", (done) => {
//       const token = data.Book.validToken.token;
//       chai
//         .request(server)
//         .get("/getAllBook")
//         .set({ authorization: token })
//         .end((error, res) => {
//           res.should.have.status(200);
//           done();
//         });
//     });
//     it("WhenGiven_InfoInCorrect_shouldReturn_BookNotFound", (done) => {
//       const token = data.Book.validWithoutCart.token;
//       chai
//         .request(server)
//         .get("/getAllBook")
//         .set({ authorization: token })
//         .end((error, res) => {
//           res.should.have.status(404);
//           done();
//         });
//     });
//     it("WhenGiven_InfoInCorrect_shouldReturn_invalidToken", (done) => {
//       const token = data.Book.inValidToken.token;
//       chai
//         .request(server)
//         .get("/getAllBook")
//         .set({ authorization: token })
//         .end((error, res) => {
//           res.should.have.status(400);
//           done();
//        });
//     });
// });
// describe("Get All Book With Low To High Price API", () => {
//     it("WhenGiven_InfoCorrect_AllBookShould_ReturnSuccessfully", (done) => {
//       const token = data.Book.validToken.token;
//       chai
//         .request(server)
//         .get("/lowTOHighPrice")
//         .set({ authorization: token })
//         .end((error, res) => {
//           res.should.have.status(200);
//           done();
//         });
//     });
//     it("WhenGiven_InfoInCorrect_shouldReturn_BookNotFound", (done) => {
//       const token = data.Book.validWithoutCart.token;
//       chai
//         .request(server)
//         .get("/lowTOHighPrice")
//         .set({ authorization: token })
//         .end((error, res) => {
//           res.should.have.status(404);
//           done();
//         });
//     });
//     it("WhenGiven_InfoInCorrect_shouldReturn_invalidToken", (done) => {
//       const token = data.Book.inValidToken.token;
//       chai
//         .request(server)
//         .get("/lowTOHighPrice")
//         .set({ authorization: token })
//         .end((error, res) => {
//           res.should.have.status(400);
//           done();
//        });
//     });
// });
// describe("Get All Book With High To Low Price API", () => {
//     it("WhenGiven_InfoCorrect_AllBookShould_ReturnSuccessfully", (done) => {
//       const token = data.Book.validToken.token;
//       chai
//         .request(server)
//         .get("/highToLowPrice")
//         .set({ authorization: token })
//         .end((error, res) => {
//           res.should.have.status(200);
//           done();
//         });
//     });
//     it("WhenGiven_InfoInCorrect_shouldReturn_BookNotFound", (done) => {
//       const token = data.Book.validWithoutCart.token;
//       chai
//         .request(server)
//         .get("/highToLowPrice")
//         .set({ authorization: token })
//         .end((error, res) => {
//           res.should.have.status(404);
//           done();
//         });
//     });
//     it("WhenGiven_InfoInCorrect_shouldReturn_invalidToken", (done) => {
//       const token = data.Book.inValidToken.token;
//       chai
//         .request(server)
//         .get("/highToLowPrice")
//         .set({ authorization: token })
//         .end((error, res) => {
//           res.should.have.status(400);
//           done();
//        });
//     });
// });
describe("Get All Book Within High To Low Price Limit API", () => {
    it("WhenGiven_InfoCorrect_AllBookShould_ReturnSuccessfully", (done) => {
      const token = data.Book.validToken.token;
      const price = {"min":"40","max":"90"}
      console.log(price.max)
      chai
        .request(server)
        .post("/minAndMaxPrice")
        .send(price)
        .set({ authorization: token })
        .end((error, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it("WhenGiven_InfoInCorrect_shouldReturn_BookNotFound", (done) => {
      const token = data.Book.validWithoutCart.token;
      const price = {"min":"40","max":"90"}
      chai
        .request(server)
        .post("/minAndMaxPrice")
        .send(price)
        .set({ authorization: token })
        .end((error, res) => {
          res.should.have.status(404);
          done();
        });
    });
    it("WhenGiven_InfoInCorrect_shouldReturn_invalidToken", (done) => {
      const token = data.Book.inValidToken.token;
      const price = {"min":"40","max":"90"}
      console.log(price.max)
      chai
        .request(server)
        .post("/minAndMaxPrice")
        .send(price)
        .set({ authorization: token })
        .end((error, res) => {
          res.should.have.status(400);
          done();
       });
    });
});