import { Navigate } from "react-router-dom";
import { autoLoginService } from "../../services";
import { useAuth } from "../../contexts/authContext";

export const useAutoLogin = async () => {
  const { completeUserInfo, login } = useAuth();
  try {
    console.log(completeUserInfo, "complete user info")
    const customFormData = {
      userEmail: completeUserInfo?.data?.user?.userEmail,
      password: completeUserInfo?.data?.user?.password
    };

//ex Vamos a recibir toda la info del usuario por completeUserInfo, que se
//ex settea en el register, y no pasa por el
console.log("hola!", customFormData)
    const sentAutoLoginData = await autoLoginService(customFormData);
    if (sentAutoLoginData?.status == 200) {
      const { name, userEmail, image, isVerified } = sentAutoLoginData.data.user;
      console.log("Es un 200", sentAutoLoginData?.data)
        
      const customUser = {
        token: sentAutoLoginData.data.token,
        name,
        userEmail,
        image,
        isVerified,
        _id: sentAutoLoginData.data.user._id,
      };

      const userToJSONString = JSON.stringify(customUser)
      login(userToJSONString);
       return <Navigate to="/dashboard"/>
    } else {
        return <Navigate to="/login" />
    }
  } catch (error) {
    return error.message;
  }
};
