import md5 from "blueimp-md5";

export default function Gravatar({ email, name }) {
  return (
    <>
      <img
        src={`https://www.gravatar.com/avatar/${md5(email.trim().toLowerCase())}?s=50&d=identicon`}
        alt={name}
        className="img-fluid rounded-circle"
        width="30"
        height="30"
      />
    </>
  );
}
