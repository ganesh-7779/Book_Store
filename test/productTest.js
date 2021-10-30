const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const data = require("./data.json");
const faker = require("faker");
chai.should();
chai.use(chaiHttp);

describe("Create Book API", () => {
  it("WhenGiven_InfoCorrect_BookShould_CreatedSuccessfully", (done) => {
    const token = data.Book.validToken.token;
    const createBook = {
      name: faker.lorem.word(),
      author: faker.name.findName(),
      category: faker.lorem.word(),
      description: faker.lorem.sentence(),
      price: 455,
    };
    chai
      .request(server)
      .post("/createBook")
      .set({ authorization: token })
      .send(createBook)
      .end((error, res) => {
        res.should.have.status(201);
        done();
      });
  });
  it("WhenGiven_InfoInCorrect_BookShould_failedTo_Createbook", (done) => {
    const token = data.Book.validToken.token;
    const createBook = {
      name: faker.lorem.word(),
      author: faker.name.findName(),
      category: faker.lorem.word(),
      price: 455,
    };
    chai
      .request(server)
      .post("/createBook")
      .set({ authorization: token })
      .send(createBook)
      .end((error, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it("WhenGiven_TokenInvalid_ShouldReturn_InvalidToken", (done) => {
    const token = data.Book.inValidToken.token;
    const createBook = {
      name: faker.lorem.word(),
      author: faker.name.findName(),
      category: faker.lorem.word(),
      description: faker.lorem.sentence(),
      price: 455,
    };
    chai
      .request(server)
      .post("/createBook")
      .set({ authorization: token })
      .send(createBook)
      .end((error, res) => {
        res.should.have.status(400);
        done();
      });
   });
});
