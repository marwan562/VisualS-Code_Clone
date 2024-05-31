type TProps = string;

const validationInput = (name: TProps) => {
  let error = "";

  if (!name.trim() && name.length ===0) {
    error = "Please Enter Name";
  }

  return { error };
};

export default validationInput;
