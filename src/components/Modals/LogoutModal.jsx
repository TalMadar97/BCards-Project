import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertModal from "./AlertModal";
import cacheUtils from "../../utils/cache";

function LogoutModal() {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const logout = () => {
    cacheUtils.clear();
    setModalOpen(false);

    if (location.pathname === "/") {
      location.reload();
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <div>
        <button className="logout-button" onClick={() => setModalOpen(true)}>
          Logout
        </button>
        <AlertModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={logout}
          title={"Are you sure you want to logout ?"}
        />
      </div>
    </>
  );
}

export default LogoutModal;
