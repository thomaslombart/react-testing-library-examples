let nextId = 0;

export const addPost = (post) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) {
        resolve({ status: 200, data: { ...post, id: nextId++ } });
      } else {
        reject({
          status: 500,
          data: "Something wrong happened. Please, retry.",
        });
      }
    }, 500);
  });
};
