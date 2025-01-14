import { useEffect, useState } from "react";
import Loading from "../Loading";
import Error from "../Error";
import { getUser } from "../../utils/cache";
import { getProfile } from "../../services/api";
import Profile from "./Profile";

function ProfilePage() {
  const user = getUser();
  const userId = user?._id;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile(userId);
        setProfile(response.data);
      } catch (error) {
        console.error(error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) {
    return <Loading />;
  }

  if (!profile) {
    return <Error message="Error with the provided profile" />;
  }

  return (
    <>
      <div className="single-card-page">
        <h1>PROFILE</h1>
        <Profile {...profile} />
      </div>
    </>
  );
}

export default ProfilePage;
