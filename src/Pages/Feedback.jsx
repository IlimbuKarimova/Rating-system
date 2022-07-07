import React from 'react';
import Box from '@mui/material/Box';
import { useNavigate, useParams } from "react-router-dom";
import { FormControl, FormLabel, Rating, Stack, Button, IconButton } from '@mui/material';
import { useEffect } from 'react';
import { useProductContext } from '../Context/ProductContextProvider';
import { useState } from 'react';
import RecommendIcon from '@mui/icons-material/Recommend';
import { useAuth } from '../Context/AuthContextProvider';
import { useLikeContext } from '../Context/LikeContextProvider';
import { notify } from '../Components/Tostify/Toastify';



export default function Feedback(item) {
const navigate = useNavigate();

// 
  const { currentUser } = useAuth();

const { addLike, delLike, getLike, likes, allLikes } = useLikeContext();
const isLikedF = () =>
  likes.some((like) => {
    return like.prodId === item.id;
  });
const [disabled, setDisabled] = React.useState(false);
const [isLiked, setIsLiked] = React.useState(isLikedF());
// 

  const { id } = useParams();
  const { getOneProduct, oneProd, saveEditedProd } = useProductContext();
  const [thoroughness, setThoroughness] = useState(0);
  const [efficiency, setEfficiency] = useState(0);
  const [attitude, setAttitude] = useState(0);
  const [informing, setInforming] = useState(0);


  useEffect(() => {
    getOneProduct(id);
  }, [id]);


  function countAverage(arr){
    let result = 0;
    if(arr){
      arr.forEach(item=>{
        result+=item.value
      })
      return result/arr.length
    }
  }
  
  const sendRating = async() => {
    if(!currentUser.user){
      notify('Необходимо войти в аккаунт')
      return
    }

    oneProd.rating.thoroughness = oneProd.rating.thoroughness.filter(item=>item.user !== currentUser.user)
    oneProd.rating.thoroughness.push(
      {
        user: currentUser.user,
        value: thoroughness
      }
    )

    oneProd.rating.efficiency = oneProd.rating.efficiency.filter(item=>item.user !== currentUser.user)
    oneProd.rating.efficiency.push({
      user: currentUser.user,
      value: efficiency
    })

    oneProd.rating.attitude = oneProd.rating.attitude.filter(item=>item.user !== currentUser.user)
    oneProd.rating.attitude.push(
      {
        user: currentUser.user,
        value: attitude
      }
    )

    oneProd.rating.informing = oneProd.rating.informing.filter(item=> item.user !== currentUser.user)
    oneProd.rating.informing.push(
      {
        user: currentUser.user,
        value: attitude
      }
    )

    let averageRating = countAverage(oneProd.rating.thoroughness) +
     countAverage(oneProd.rating.efficiency) + 
     countAverage(oneProd.rating.attitude) + 
     countAverage(oneProd.rating.informing);
    const newObj = {
      ...oneProd,
      rating:{
        ...oneProd.rating,
        average: averageRating/4,
      }
    }
    await saveEditedProd(newObj)
    getOneProduct(id)
  }
 
  // 

  React.useEffect(() => {
    getLike();
  }, []);
  React.useEffect(() => {
    setIsLiked(isLikedF());
  }, [likes]);

  const handleSubmitLike = () => {
    let forDelId = likes.find((prod) => prod.prodId === item.id);
    // console.log(forDelId);
    let obj = {
      user: currentUser.user,
      prodId: item.id,
    };
    // console.log(obj);
    let checkProdIsLiked = likes.some((elem) => {
      return obj.prodId === elem.prodId;
    });
    if (checkProdIsLiked && forDelId) {
      delLike(forDelId.id);
    } else {
      addLike(obj);
    }
  };
  let oneProdLikes = allLikes.filter((elem) => {
    return elem.prodId === item.id;
  });
  // 


  return (
    <div align = "center">

    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 3, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
      {
        oneProd ? (
          <>
          <Stack spacing={1}>
          <h3>Тщательность обследования  <br></br><Rating name="half-rating" value={thoroughness} onChange={(e)=>setThoroughness(parseInt(e.target.value))} precision={1} /> </h3> {countAverage(oneProd.rating.thoroughness) || 0}<br></br> <br></br>
          <h3>Эффективность лечения <br></br><Rating name="half-rating" value={efficiency} onChange={(e)=>setEfficiency(parseInt(e.target.value))} precision={1} /></h3>  {countAverage(oneProd.rating.efficiency) || 0 } <br></br> <br></br>
          <h3>Отношение к пациенту <br></br><Rating name="half-rating"  value={attitude} onChange={(e)=>setAttitude(parseInt(e.target.value))} precision={1} /> </h3> {countAverage(oneProd.rating.attitude) || 0 }<br></br><br></br>
          <h3>Информирование пациента <br></br><Rating name="half-rating" value={informing} onChange={(e)=>setInforming(parseInt(e.target.value))} precision={1} /> </h3>{countAverage(oneProd.rating.informing) || 0 } <br></br><br></br>
          <h3>Общее <br></br><Rating readOnly value={ oneProd && oneProd.rating ? oneProd.rating.average : 0 } /></h3> Average : {oneProd.rating.average}
         </Stack>
          <div align = "center" > Количество проголосовавших: <count all rating >{Object.keys(oneProd.rating.efficiency).length}</count></div>
     </>

        ) : (<h3>Идёт загрузка</h3>)
      }
    <FormControl>
      {/* <FormLabel id="demo-radio-buttons-group-label">Посоветуете ли Вы врача???</FormLabel>
      <IconButton
            color="inherit"
            onClick={() => {
              setDisabled(true);
              handleSubmitLike();
            }}
          >
            {isLiked ? (
              <RecommendIcon color="warning" />
            ) : (
              <RecommendIcon />
            )}
            {oneProdLikes.length}
          </IconButton> */}

      {/* <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="false" control={<Radio />} label="yes" />
        <FormControlLabel value="true" control={<Radio />} label="no" />
        
      </RadioGroup> */}
    </FormControl>
    <br></br>
   
    
      <Button onClick={sendRating} variant="contained">Отправить</Button> 
 <br/>
              <Button         onClick={() => navigate(-1)}
 variant="outlined" color="warning">
                {" "}
                Назад
              </Button>
              {" "}
            
      
    </Box>
    
    </div>
    
  );
}
