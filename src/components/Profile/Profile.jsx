import {
  stringifyAddress,
  stringifyAuthLevel,
  stringifyName,
} from "../../utils/strings";
import IconLink from "../icons/IconLink";

function Profile(props) {
  console.log(props);

  return (
    <>
      <div className="card p-3">
        {/* {image()} */}
        <h2 className="card-title">{props.title}</h2>
        <h3 className="card-subtitle">{props.subtitle}</h3>
        <p className="card-text">{props.description}</p>
        {props.name && <p>Name: {stringifyName(props.name)}</p>}
        {props.email && <p>Email: {props.email}</p>}
        {props.phone && <p>Phone: {props.phone}</p>}
        <p>Auth Level: {stringifyAuthLevel(props)}</p>
        {props.address && <p>Address: {stringifyAddress(props.address)}</p>}
        <div>
          <IconLink
            iconClass="fa-solid fa-pen-to-square"
            href={`/profile/${props._id}`}
          />
        </div>
      </div>
    </>
  );
}

export default Profile;
