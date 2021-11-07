const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const data = require("./data.json");
const faker = require("faker");
chai.should();
chai.use(chaiHttp);

describe("Add To Cart API", () => {
  it("WhenGiven_InfoCorrect_Should_Return_ItemAddedSuccessfully", (done) => {
    const token = data.Book.validToken.token;
    const bookToAdd = { quantity: "5" };
    chai
      .request(server)
      .post("/addToCart/617d81757620b0415dcd3c5f")
      .set({ authorization: token })
      .send(bookToAdd)
      .end((error, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("WhenGiven_InfoInCorrect_shouldReturn_ItemAddedSuccessfully", (done) => {
    const token = data.Book.validToken.token;
    const bookToAdd = { quantity: "-1" };
    chai
      .request(server)
      .post("/addToCart/617d81757620b0415dcd3c5f")
      .set({ authorization: token })
      .send(bookToAdd)
      .end((error, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it("WhenGiven_InfoInCorrect_shouldReturn_inValidQuantity", (done) => {
    const token = data.Book.validToken.token;
    const bookToAdd = { quantity: "-1" };
    chai
      .request(server)
      .post("/addToCart/6187daa30b8e1ef2f0750531")
      .set({ authorization: token })
      .send(bookToAdd)
      .end((error, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it("WhenGiven_InfoInCorrect_shouldReturn_invalidToken", (done) => {
    const token = data.Book.inValidToken.token;
    chai
      .request(server)
      .post("/addToCart/6187daa30b8e1ef2f0750531")
      .set({ authorization: token })
      .end((error, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
