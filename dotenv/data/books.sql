  
DROP TABLE IF EXISTS books;
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  author VARCHAR(255),
  description VARCHAR(750),
  -- description TEXT,
  image_url VARCHAR(255),
  -- status VARCHAR(255),
  isbn VARCHAR(255)
  -- due DATE NOT NULL DEFAULT NOW()
);

INSERT INTO books (id, title, author, description, image_url, isbn) VALUES (1, 'Word and Image in Russian History', 'Maria di Salvo,Daniel H. Kaiser,Valerie A. Kivelson', 'Word and Image invokes and honors the scholarly contributions of Gary Marker. Twenty scholars from Russia, the United Kingdom, Italy, Ukraine and the United States examine some of the main themes of Marker’s scholarship on Russia—literacy, education, and printing; gender and politics; the importance of visual sources for historical study; and the intersections of religious and political discourse in Imperial Russia. A biography of Marker, a survey of his scholarship, and a list of his publications complete the volume. Contributors: Valerie Kivelson, Giovanna Brogi (University of Milan), Christine Ruane (University of Tulsa), Elena Smilianskaia (Moscow), Daniela Steila (University of Turin), Nancy Kollmann (Stanford University), Daniel H. Kaiser (Grinnell College), Maria di Salvo (University of Milan), Cynthia Whittaker (City Univ. of New York), Simon Dixon (University of London), Evgenii Anisimov (St. Petersburg), Alexander Kamenskii (Higher School of Economics, Moscow), Janet Hartley (London School of Economics), Olga Kosheleva (Moscow State University), Maksim Yaremenko (Kyiv), Patrick OMeara (University of Durham), Roger Bartlett (London), Joseph Bradley (University of Tulsa), Robert Weinberg (Swarthmore College)', 'http://books.google.com/books/content?id=z7OrDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api', 'NO ISBN');