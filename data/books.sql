  
DROP TABLE IF EXISTS books;
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  author VARCHAR(255),
  -- description VARCHAR(750),
  description TEXT,
  image_url VARCHAR(255),
  -- status VARCHAR(255),
  isbn VARCHAR(255)
  -- due DATE NOT NULL DEFAULT NOW()
);

INSERT INTO books (id, title, author, description, image_url, isbn) VALUES (1, 'Word and Image in Russian History', 'Maria di Salvo,Daniel H. Kaiser,Valerie A. Kivelson', 'Word and Image invokes and honors the scholarly contributions of Gary Marker.', 'http://books.google.com/books/content?id=z7OrDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'NO ISBN');
