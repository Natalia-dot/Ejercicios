import { Navigate } from "react-router-dom";
import { autoLoginService } from "../../services";

export const useAutoLogin = async (completeUserInfo, login) => {
  try {
    const { password, userEmail } = completeUserInfo?.data?.user;
    const customFormData = {
      email,
      password,
    };

//ex Vamos a recibir toda la info del usuario por completeUserInfo, que se
//ex settea en el register, y no pasa por el

    const sentAutoLoginData = await autoLoginService(customFormData);
    if (sentAutoLoginData?.status == 200) {
      const { name, userEmail, image, isVerified } =
        sentAutoLoginData?.data?.user;
      const customUser = {
        token: sentAutoLoginData.data.token,
        user: name,
        userEmail,
        image,
        isVerified,
        _id: sentAutoLoginData?.data?.user?._id,
      };

      const userToJSONString = JSON.stringify(customUser)
      login(userToJSONString);
      return <Navigate to="/dashboard"/>
    } else {
        return <Navigate to="/login" />
    }
  } catch (error) {
    console.log(error);
  }
};
