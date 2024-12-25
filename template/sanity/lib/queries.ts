export const AUTHORS_QUERY = `*[_type == 'author'][0...12]{
  _id,
  name,
  image
}`;
