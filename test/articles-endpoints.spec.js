const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');

describe.only('Articles Endpoints', function() {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('clean the table', () => db('bookmarks').truncate());
  context('Given there are articles in the database', () => {
    const testArticles = [
      {
        id: 1,
        title: 'First test post!',
        url: 'https://www.url.com',
        description: 'Lorem ipsum',
        rating: 4
      },
      {
        id: 2,
        title: 'Second test post!',
        url: 'https://www.google.com',
        description: 'Lorem ipsum II',
        rating: 2
      },
      {
        id: 3,
        title: 'Third test post!',
        url: 'https://www.npr.com',
        description: 'Lorem ipsum III',
        rating: 7
      },
      {
        id: 4,
        title: 'Fourth test post!',
        url: 'https://www.facebook.com',
        description: 'Lorem ipsum IV',
        rating: 5
      },
    ];
    beforeEach('insert articles', () => {
      return db
        .into('bookmarks')
        .insert(testArticles);
    });
    it('GET /bookmarks responds with 200 and all of the articles', () => {
      return supertest(app)
        .get('/bookmarks')
        .expect(200, testArticles);

    });
  });
});