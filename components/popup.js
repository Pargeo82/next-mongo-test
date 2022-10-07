import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function PopupElement(props) {
  return (
    <Popup trigger={props.handlePopup} position="center">
      <div>info</div>
    </Popup>
  );
}
