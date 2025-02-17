import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { API } from "../../service/Api"
import { DataContext } from '../../context/DataProvider'; 
import Select from '@mui/material/Select';
import {
  Box,
  styled,
  FormControl,
  InputBase,
  Button,
  // Text area autosize is giving resize error
  TextareaAutosize,
} from "@mui/material";
// icons
import { AddCircle as Add } from "@mui/icons-material"; 
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import bannerImage from '../assets/banner.png'

// -----------------------------------------

const Container = styled(Box)`
  margin: 0px 0px;
  padding: 0px 2px;
  width: 100%;
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #ffffff;
`;

const InsideContainer = styled(Box)`
  width: 70%;
  margin: 50px 5px;
  padding: 5px 5px;
  border: 2px solid #3d3d3dde;
  border-radius: 14px;
  background: #ffffff;
  position: relative;
  overflow: hidden;
  
  // z-index:100;
`;

const StyledFileInput = styled(Box)`
  margin: 0px 0px;
  padding: 0px 0px;
  display:flex;
  justify-content: space-around;
  align-items:center;
  border: 2px solid #d5edff;
  border-radius: 10px;
  border-shadow: 0 5px 25px rgba(14, 21, 37, 0.8);
  flex: 1 0 2rem;
`;

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  border: 2px solid #d5edff;
  border-radius: 10px;
  border-shadow: 0 5px 25px rgba(14, 21, 37, 0.8);
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background:#e0eff9;
`;

const InputTextField = styled(InputBase)`

  border: 2px solid #d5edff;
  border-radius: 10px;
  margin: 2px 4px;
  padding: 3px 2px;
  padding-left: 8px;
  font-size: 21px;
  font-weight: 700;
  background: #e0eff9;
  flex: 1 0 7rem;
  &:focus-visible {
    outline: 2px solid grey;
  }
  ::placeholder {
    opacity: 0.6;
  }
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  border: 2px solid #d5edff;
  border-radius: 10px;
  margin: 7px 0px;
  padding: 10px 2px;
  padding-left: 8px;
  font-size: 17px;
  font-weight: 350;
  background: #e0eff9;
  resize:none;
  &:focus-visible {
    outline: 2px solid grey;
  }
  ::placeholder {
    opacity: 0.6;
  }
`;
const Textarea2 = styled(TextareaAutosize)`
  width: 100%;
  border: 2px solid #d5edff;
  border-radius: 10px;
  margin: 7px 0px;
  margin-left:7px;
  padding: 10px 2px;
  padding-left: 8px;
  font-size: 17px;
  font-weight: 350;
  background: #e0eff9;
  resize: none;
  &:focus-visible {
    outline: 2px solid grey;
  }
  ::placeholder {
    opacity: 0.6;
  }
`;

const BudgetArea = styled(TextareaAutosize)`
  width: 31vw;
  padding: 8px 5px;
  border: 2px solid #d5edff;
  border-radius: 10px;
  margin:2px 2px;
  margin-left:7px;
  font-size: 17px;
  font-weight: 350;
  background: #e0eff9;
  resize:none;
  &:focus-visible {
    outline: 2px solid green;
    z-index:10;
  }
  ::placeholder {
    opacity: 0.6;
  }
`;

const StyledSelect = styled(Select)`
  width: 31vw;
  height : 2.48rem;
  padding: 0px 5px;
  border: 2px solid #d5edff;
  border-radius: 10px;
  margin:2px 2px;
  margin-left:7px;
  font-size: 17px;
  font-weight: 350;
  background: #e0eff9;
  &:focus-visible { 
  }
  ::placeholder {
    opacity: 0.6;
  }
   &:focus-visible {
    outline: 2px solid grey;
  }
`;


const TextInformationarea = styled(TextareaAutosize)`
  width: 31vw;
  padding: 8px 5px;
  border: 2px solid #d5edff;
  border-radius: 10px;
  margin:2px 2px;
  margin-left:7px;
  font-size: 17px;
  font-weight: 350;
  background: #e0eff9;
  resize:none;
  &:focus-visible {
    outline: 2px solid grey;
  }
  ::placeholder {
    opacity: 0.6;
  }
`;
const Image = styled('img')({
  width: '100%',
  height: '50vh',
  aspectRatio: "3/2",
  objectFit: 'contain',
  borderRadius: '14px',
});


const initialPost = {
  name: '',
  title: '',
  summary: '',
  budget: '',
  usertype: 'Individual',
  picture: '',
  csrpdf: '',
  number: '',
  email: '',
  address: '',
  url: '',
  description: '',
  username: '',
  categories: '',
  createdDate: new Date(),
};

function CreatePost() {
  const [summary, setSummary] = useState("");
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const [post, setPost] = useState(initialPost);

  const [file, setFile] = useState('');

  const defaultUserType = 'Individual'
  const [usertype, setUserType] = useState(defaultUserType)

  const { account } = useContext(DataContext);


  const [formErrors, setFormErrors] = useState({
    title: false,
    summary: false,
    number: false,
    email: false,
    address: false,
    url: false,
    description: false,
  });
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  
  // -*-*-*-*-**-***-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-**

  const handleSummaryChange = (e) => {
    const inputValue = e.target.value;

    const RestrictedInput = inputValue.slice(0, 300);

    setSummary(RestrictedInput);
  };

  const handleTitleChange = (e) => {
    const inputValue = e.target.value;

    const RestrictedInput = inputValue.slice(0, 21);

    setTitle(RestrictedInput);
  };
 

  const handleNumberChange = (e) => {
    const inputValue = e.target.value;

    const numericInput = inputValue.replace(/[^0-9]/g, "");

    const restrictedInput = numericInput.slice(0, 10);

    setNumber(restrictedInput);
  };
 

  const url = post.picture ? post.picture : bannerImage;

  useEffect(() => {
    try {
      const getImage = async () => {
        if (file) {
          const data = new FormData();
          data.append("name", file.name);
          data.append("file", file);

          console.log(file);
          const response = await API.uploadFile(data);
          setPost({ ...post, picture: response.data.imageUrl })
        }
      }
      getImage();



    } catch (error) {
      console.log("Error");
    }

    post.categories = location.search?.split('=')[1] || 'All';
    post.username = account.username;
    post.name = account.name;

  }, [file])

 

  // -===-=-==-=-=-==-=--==

  const validateForm = () => {
    const errors = {
      title: !post.title || !post.title.trim(),
      summary: !post.summary || !post.summary.trim(),
      number: !post.number || !post.number.trim(),
      email: !post.email || !post.email.trim(),
      address: !post.address || !post.address.trim(),
      url: !post.url || !post.url.trim(),
      description: !post.description || !post.description.trim(),
    };

    setFormErrors(errors);
    const formIsValid = Object.values(errors).every((value) => !value);
    setShowError(!formIsValid);
    return formIsValid;
  };

  const categoryParam = location.search?.split('=')[1] || 'All';


  const savePost = async () => {
    if (validateForm()) {
      try {
        // setLoading(true);
        let response = await API.createPost(post);
        if (response.isSuccess) {
          navigate(`/?category=${categoryParam}`);
        }
        else {
          setErrorMessage('Error saving post. Please try again.');
        }

      } catch (error) {
        setErrorMessage('An unexpected error occurred. Please try again later.');

      }
    }
  }

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  }

  // -=-==-=-=-=-=-=-=-=-=-=-=-=-=-=--=-===-=

  return (
    <div>
      <Container>
        <InsideContainer >


          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "5px 0px",
            }}
          >


            {/* ----------------- Title --------- */}

            <InputTextField
              placeholder="Enter Project Title.."
              value={title}
              required
              autoFocus
              name="title"
              onChange={(e) => {
                handleTitleChange(e);
                handleChange(e);
              }}
            />

            {/* ------------- Image -------------- */}

            <StyledFileInput>
              <label
                htmlFor="fileInput"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", }}
                name="image"
              >
                <Add fontSize="large" />
                Choose Banner Image (PNG*)
              </label>

              <input
                type="file"
                id="fileInput"
                key="fileInput"
                style={{ display: "none" }}
                accept=".png"

                onChange={(e) => setFile(e.target.files[0])}
              />

            </StyledFileInput>

          </div>
          {/* *-*--*-*-*-*-*-*-*- summary -*-*-**-**-*-*-*/}

          <Textarea
            placeholder="Write Summary of project...(Max 110 Charater)"
            name="summary"
            value={summary}
            required
            inputprops={{
              maxLength: 110,
            }}
            onChange={(e) => {
              handleSummaryChange(e);
              handleChange(e);
            }}
          />

          {/* *-*--*-*-*-*-*-*-*- mobile & email*-*-*-**-**-*-*-*/}
          <div
            style={{
              display: "flex",
              flexShrink: "1",
              alignItems: "center",
              justifyContent: "space-arround",
              margin: "5px 0px",
              padding: "5px 0px",
            }}
          >

            <div className="flex flex-row items-center w-full">
              < LocalPhoneOutlinedIcon />
              <TextInformationarea
                placeholder="Enter Mobile number (+91 **********)"
                name="number"
                // style={{ width: "100%" }}
                value={number}
                required
                onChange={(e) => {
                  handleNumberChange(e);
                  handleChange(e);
                }}
              />
            </div>

            <div className="flex flex-row items-center w-full">
              <EmailOutlinedIcon />
              <TextInformationarea
                placeholder="Enter Email (***@gmail.com)"
                name="email"
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>

          {/* ---------- Your address */}

          <div className="flex flex-row items-center">
            <HomeOutlinedIcon />
            <Textarea2
              placeholder="Enter Your address...."
              name="address"
              required
              onChange={(e) => handleChange(e)}
            />

          </div>

          {/* *-*--*-*-*- Refferences Url-*-**-*-*-*-*-**-**-*-*-*/}
          <div className="flex flex-row items-center">
            <LanguageOutlinedIcon />
            <Textarea2
              placeholder="Link articles related to this ..."
              name="url"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          {/* *-*--*-*-*-*-*-*-*-*-**-*-*-*-*-**-*-*-*-*-**-**-*-*-*/}

          <div className="flex flex-row items-center">
            <DescriptionOutlinedIcon />
            <Textarea2
              placeholder="Write detailed description in Headings and points..."
              name="description"
              required
              onChange={(e) => handleChange(e)}
            />

          </div>
          {/* *-*--*-*-*-*-*-*-*-*--*img*-*-*-*-*-**-**-*-*-*/}
          <Image src={url} alt="Banner img..." />


          {/* *-*--*-*-*-*-*-*-*-*-**-*-*-*-*-**-*-*-*-*-**-**-*-*-*/}

          {showError && (
            <div style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
              {errorMessage || 'Please fill out all the required fields.'}

            </div>
          )}
          {/* *-*--*-*-*-*-*-*-*-*-**-*-*-*-*-**-*-*-*-*-**-**-*-*-*/}

          <div style={{ display: "flex", justifyContent: "center", marginTop: "12px" }}>
            <Button variant="contained" onClick={() => savePost()}>Publish</Button>
          </div>

        </InsideContainer>
      </Container>
    </div>
  );
}



export default CreatePost
