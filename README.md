# GUTINDEX API

## About

Project Gutenberg provides listings of the ebooks added to their project in a number of formats, including the GUTINDEX Listings By Year as seen here (used by this API): http://www.gutenberg.org/dirs/GUTINDEX.2019

## API

```bash
# Fetch all authors
/authors

# Fetch authers by name search
/authors?byName={name}

# Fetch all books
/books

# Fetch books by title search
/books?byTitle={title}

# Fetch books by name search
/books?byName={name}

#Fetch books by name and title search
/books?byName={name}&byTitle={title}

# Fetch book by Id
/books/{id}
```

## Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

2. Install your dependencies
    ```
    cd path/to/gutindex-api; npm install
    ```

3. Start your app
    
    ```
    npm start
    ```