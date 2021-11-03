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
describe("Update Book API", () => {
    it("WhenGiven_InfoCorrect_BookShould_UpdatedSuccessfully", (done) => {
      const token = data.Book.validToken.token;
      const updateBook = {
        name: faker.lorem.word(),
        author: faker.name.findName(),
        category: faker.lorem.word(),
        description: faker.lorem.sentence(),
        price: 455,
      };
      chai
        .request(server)
        .put("/updateBook/617cb141e1686d2b8a417ff8")
        .set({ authorization: token })
        .send(updateBook)
        .end((error, res) => {
          res.should.have.status(201);
          done();
        });
    });
    it("WhenGiven_InfoInCorrect_shouldReturn _BookNotFound", (done) => {
      const token = data.Book.validToken.token;
      const updateBook = {
        name: faker.lorem.word(),
        author: faker.name.findName(),
        category: faker.lorem.word(),
        description: faker.lorem.sentence(),
        price: 455,
      };
      chai
        .request(server)
        .put("/updateBook/617cb499c8ab42b592227f59")
        .set({ authorization: token })
        .send(updateBook)
        .end((error, res) => {
          res.should.have.status(404);
          done();
        });
    });
    it("WhenGiven_TokenInvalid_ShouldReturn_InvalidToken", (done) => {
      const token = data.Book.inValidToken.token;
      const updateBook = {
        name: faker.lorem.word(),
        author: faker.name.findName(),
        category: faker.lorem.word(),
        description: faker.lorem.sentence(),
        price: 455,
      };
      chai
        .request(server)
        .put("/updateBook/617cb499c8ab42b592227f50")
        .set({ authorization: token })
        .send(updateBook)
        .end((error, res) => {
          res.should.have.status(400);
          done();
        });
     });
  });

describe("Delete Book API", () => {
    // it("WhenGiven_InfoCorrect_BookShould_DeleteSuccessfully", (done) => {
    //   const token = data.Book.validToken.token;
    //   chai
    //     .request(server)
    //     .delete("/deleteBook/617bc5685612ed9ae3d457c9")
    //     .set({ authorization: token })
    //     .end((error, res) => {
    //       res.should.have.status(200);
    //       done();
    //     });
    // });
    it("WhenGiven_InfoInCorrect_shouldReturn _BookNotFound", (done) => {
      const token = data.Book.validToken.token;
      chai
        .request(server)
        .delete("/deleteBook/617cb499c8ab42b592227f52")
        .set({ authorization: token })
        .end((error, res) => {
          res.should.have.status(404);
          done();
        });
     });
  });
describe("Get All Book API", () => {
  it("WhenGiven_InfoCorrect_AllBookShould_ReturnSuccessfully", (done) => {
    const token = data.Book.validToken.token;
    chai
      .request(server)
      .get("/getAllBook")
      .set({ authorization: token })
      .end((error, res) => {
        res.should.have.status(200);
        done();
      });
  });
//   it("WhenGiven_InfoInCorrect_shouldReturn _BookNotFound", (done) => {
//     const token = data.Book.validToken.token;
//     chai
//       .request(server)
//       .get("/getAllBook")
//       .set({ authorization: token })
//       .end((error, res) => {
//         res.should.have.status(404);
//         done();
//       });
//   });
  it("WhenGiven_InfoInCorrect_shouldReturn_invalidToken", (done) => {
    const token = data.Book.inValidToken.token;
    chai
      .request(server)
      .get("/getAllBook")
      .set({ authorization: token })
      .end((error, res) => {
        res.should.have.status(400);
        done();
      });
   });
});
describe("Get Book By Id API", () => {
    it("WhenGiven_InfoCorrect_BookShould_GetSuccessfully", (done) => {
      const token = data.Book.validToken.token;
      chai
        .request(server)
        .get("/getBookBy/617bc0e2040c1fbd144982c3")
        .set({ authorization: token })
        .end((error, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it("WhenGiven_InfoInCorrect_shouldReturn _BookNotFound", (done) => {
      const token = data.Book.validToken.token;
      chai
        .request(server)
        .get("/getBookBy/617bc0e2040c1fbd144982c7")
        .set({ authorization: token })
        .end((error, res) => {
          res.should.have.status(404);
          done();
        });
    });
    it("WhenGiven_InfoInCorrect_shouldReturn_invalidToken", (done) => {
      const token = data.Book.inValidToken.token;
      chai
        .request(server)
        .get("/getBookBy/617bc0e2040c1fbd144982c3")
        .set({ authorization: token })
        .end((error, res) => {
          res.should.have.status(400);
          done();
        });
     });
  });
describe("Search Book API", () => {
    it("WhenGiven_InfoCorrect_BookShould_ReturnSuccessfully", (done) => {
      const token = data.Book.validToken.token;
      const textToSerch = {"nameNcategory":"love"}
      chai
        .request(server)
        .post("/searchBook")
        .set({ authorization: token })
        .send(textToSerch)
        .end((error, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it("WhenGiven_InfoInCorrect_shouldReturn_BookNotFound", (done) => {
      const token = data.Book.validToken.token;
      const textToSerch = {"nameNcategory":"222"}
      chai
        .request(server)
        .get("/searchBook")
        .set({ authorization: token })
        .send(textToSerch)
        .end((error, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  describe("Add To Cart API", () => {
    it("WhenGiven_InfoCorrect_Should_Return_ItemAddedSuccessfully", (done) => {
      const token = data.Book.validToken.token;
      const bookToAdd = {"userId":"6177f8fccbebd1ed7c9c01dd","itemId": "617d81757620b0415dcd3c5f", "quantity":"5"}
      chai
        .request(server)
        .post("/addToCart")
        .set({ authorization: token })
        .send(bookToAdd)
        .end((error, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it("WhenGiven_InfoInCorrect_shouldReturn_invalidInfo", (done) => {
      const token = data.Book.validToken.token;
      const bookToAdd = {"userId":"6177f8fccbebd1ed7c9c01dd","itemId": "617d81757620b0415dcd3c5f", "quantity":"-20"}
      chai
        .request(server)
        .post("/addToCart")
        .set({ authorization: token })
        .send(bookToAdd)
        .end((error, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });