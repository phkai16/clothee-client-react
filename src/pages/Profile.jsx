import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useGetUserQuery, useUpdateUserMutation } from "../service/api.user";
import {
  PersonRounded,
  MailOutlineRounded,
  AccountCircleRounded,
  RoomOutlined,
  LocalPhoneRounded,
  TransgenderRounded,
  CalendarMonthRounded,
  FileUploadOutlined,
} from "@mui/icons-material";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import Spinner from "../components/Spinner";

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  padding: 50px 20px 20px;
  display: flex;
  gap: 40px;
  justify-content: space-between;
  ${mobile({ padding: "10px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #333;
  padding: 20px;
`;

const ProfilePicture = styled.img`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border: 1px solid #eee;
  border-radius: 50%;
  width: 150px;
  object-fit: cover;
  height: 150px;
  margin-bottom: 30px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Info = styled.span`
  font-weight: 500;
  padding-bottom: 10px;
  color: #444;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  line-height: 22px;
`;
const InfoAvatar = styled.span`
  font-weight: 500;
  padding-bottom: 10px;
  color: #444;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  flex-direction: column;
`;

const Right = styled.div`
  flex: 2;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  padding-bottom: 40px;
`;

const SubTitle = styled.h1`
  font-size: 14px;
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
`;
const Field = styled.div``;

const Input = styled.input`
  flex: 1;
  width: 300px;
  margin: 10px 0;
  padding: 10px;
  &:disabled {
    border: none;
    background-color: #fff;
    border-bottom: 1px solid #333;
  }
`;

const Radio = styled.div`
  flex: 1;
  width: 300px;
  margin: 10px 0;
  padding: 10px;
  gap: 10px;
`;

const Button = styled.button`
  margin: 10px 0;
  width: 320px;
  border: none;
  padding: 10px 20px;
  height: 40px;
  background-color: var(--dark-primary);
  border-radius: 6px;
  font-weight: 500;
  color: white;
  cursor: pointer;
  &:disabled {
    opacity: 0.9;
    cursor: not-allowed;
  }
`;

export default function Profile() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [user, setUser] = useState({});
  const [editable, setEditable] = useState(false);
  const [file, setFile] = useState(null);
  const { data, isLoading, isSuccess } = useGetUserQuery(currentUser?._id, {
    skip: !currentUser?._id,
  });
  const [updateUser, { isLoading: updateLoading, isSuccess: updateSuccess }] =
    useUpdateUserMutation();

  useEffect(() => {
    if (isSuccess) {
      setUser(data);
    }
    if (updateSuccess) {
      setUser(data);
    }
  }, [currentUser, isSuccess, updateSuccess]);
  console.log(user);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (file !== null) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            const userEdit = {
              ...user,
              img: downloadURL,
              id: currentUser._id,
            };
            updateUser(userEdit);
            console.log(userEdit);
          });
        }
      );
    } else {
      const userEdit = {
        ...user,
        id: currentUser._id,
      };
      updateUser(userEdit);
      console.log(userEdit);
    }
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Left>
            <ProfilePicture src={user.img || "/blank-profile-picture.png"} />
            <InfoContainer>
              <InfoAvatar>
                <label
                  htmlFor="file"
                  style={{
                    backgroundColor: "var(--dark-primary)",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Change Avatar
                  <FileUploadOutlined fontSize="small" />
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <p style={{ paddingTop: "10px", color: "gray" }}>
                  {file !== null ? file.name : "No Image Chosen"}
                </p>
              </InfoAvatar>
              <Info style={{ margin: "30px 0 4px", fontWeight: 600 }}>
                Account
              </Info>
              <Info>
                <AccountCircleRounded fontSize="small" />
                Username: {user.username || ""}
              </Info>
              <Info>
                <MailOutlineRounded fontSize="small" />
                Email: {user.email || ""}
              </Info>
              <Info style={{ margin: "20px 0 4px", fontWeight: 600 }}>
                Contact
              </Info>

              <Info>
                <PersonRounded fontSize="small" />
                Full Name: {user.fullname || ""}
              </Info>
              <Info>
                <LocalPhoneRounded fontSize="small" />
                Phone: {user.phone || "Aimee"}
              </Info>
              <Info>
                <RoomOutlined fontSize="small" />
                Address: {user.address || ""}
              </Info>
              <Info>
                <CalendarMonthRounded fontSize="small" />
                Birthday: {user.birthday || ""}
              </Info>
              <Info>
                <TransgenderRounded fontSize="small" />
                Gender: {user.gender || ""}
              </Info>
            </InfoContainer>
          </Left>
          <Right>
            <Title>Profile Setting</Title>
            <Form>
              <Field>
                <SubTitle>Full Name</SubTitle>
                <Input
                  name="fullname"
                  defaultValue={user.fullname}
                  disabled={!editable}
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <SubTitle>Username</SubTitle>
                <Input
                  name="username"
                  defaultValue={user.username}
                  disabled={!editable}
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <SubTitle>Email</SubTitle>
                <Input
                  name="email"
                  defaultValue={user.email}
                  disabled={!editable}
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <SubTitle>Birthday</SubTitle>
                <Input
                  name="birthday"
                  type="text"
                  disabled={!editable}
                  onChange={handleChange}
                  placeholder={user.birthday || "yyyy/MM/dd"}
                />
              </Field>

              <Field>
                <SubTitle>Address</SubTitle>
                <Input
                  name="address"
                  placeholder="Enter your address..."
                  defaultValue={user.address}
                  disabled={!editable}
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <SubTitle>Phone</SubTitle>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number..."
                  defaultValue={user.phone}
                  disabled={!editable}
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <SubTitle>Gender</SubTitle>
                <Radio className="userUpdateGender" onChange={handleChange}>
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    disabled={!editable}
                    defaultChecked={
                      user.gender
                        ? user.gender === "male"
                          ? true
                          : false
                        : true
                    }
                  />

                  <label htmlFor="male" style={{ padding: " 0 10px 0 4px" }}>
                    Male
                  </label>
                  <input
                    disabled={!editable}
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                    defaultChecked={user.gender === "female" ? true : false}
                  />
                  <label htmlFor="female" style={{ padding: " 0 10px 0 4px" }}>
                    Female
                  </label>
                  <input
                    type="radio"
                    disabled={!editable}
                    name="gender"
                    id="other"
                    value="other"
                    defaultChecked={user.gender === "other" ? true : false}
                  />
                  <label htmlFor="other" style={{ padding: " 0 10px 0 4px" }}>
                    Other
                  </label>
                </Radio>
              </Field>
              <Field>
                <SubTitle>&nbsp;</SubTitle>
                {editable ? (
                  <div style={{ display: "flex", width: "320px", gap: "10px" }}>
                    <Button
                      style={{
                        width: "100%",
                        backgroundColor: "#fff",
                        color: "var(--dark-primary)",
                        border: "2px solid var(--dark-primary)",
                      }}
                      className="profile-button"
                      type="button"
                      onClick={() => setEditable(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      style={{ width: "100%" }}
                      className="profile-button"
                      type="button"
                      onClick={handleUpdate}
                      disabled={updateLoading}
                    >
                      Save Profile
                    </Button>
                  </div>
                ) : (
                  <Button
                    className="profile-button"
                    type="button"
                    onClick={() => setEditable(true)}
                  >
                    Edit Profile
                  </Button>
                )}
              </Field>
            </Form>
          </Right>
        </Wrapper>
        {isLoading && <Spinner />}
        {updateLoading && <Spinner />}
      </Container>
    </>
  );
}
