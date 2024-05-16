import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  Modal as RNModal,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Colors, Images, Font, Global } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { readFile } from "react-native-fs";
import axios from "axios";

const ScanScreen = () => {
  const devices = useCameraDevices("wide-angle-camera");
  const device = devices.back;
  const navigation = useNavigation();
  const camera = useRef(null);
  const flatListRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [showBasicDetailsModal, setShowBasicDetailsModal] = useState(false);
  const [photoData, setPhotoData] = useState("");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [apiResponseData, setApiResponseData] = useState({});

  const dummyDetail = [
    {
      id: "1",
      SKU: "567655",
      MRP: "450000",
      Category: "Slotaire",
      GrossWeight: "1.05 GM",
      DimondWeight: "0.05 CT",
      DimondNo: "SJI2345789789",
      OtherStoneWeight: "0.08 GM",
      OtherstoneNo: "12",
      OtherStoneName: "Ruby",
      image: Images.JEWEL_IMAGE,
    },
    // {
    //   id:"2",
    //   SKU:"567655",
    //   MRP:"450000",
    //   Category:"Slotaire",
    //   GrossWeight:"1.05 GM",
    //   DimondWeight:"0.05 CT",
    //   DimondNo:"SJI2345789789",
    //   OtherStoneWeight:"0.08 GM",
    //   OtherstoneNo: "12",
    //   OtherStoneName:'Ruby',
    //   image:Images.JEWEL_IMAGE

    // },
  ];
  const checkPermission = async () => {
    const cameraPermission = await Camera.requestCameraPermission();
    console.log("444", cameraPermission);
  };

  useEffect(() => {
    checkPermission();
    console.log("sfedf", device);
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  if (device == null) {
    return <ActivityIndicator />;
  }

  const takePicture = async () => {
    try {
      const photo = await camera.current.takePhoto({
        enableShutterSound: false,
      });
      console.log("Photo taken:", photo);

      if (photo?.path) {
        const base64Image = await convertImageToBase64(photo.path);
        // console.log('Base64 Image:', base64Image);

        setPhotoData(photo.path);
        setShowModal(true);
        setLoading(true); // Show loader
        await sendImageToAPI(base64Image);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error taking picture:", error);
    }
  };

  const convertImageToBase64 = async (imagePath) => {
    try {
      const imageData = await readFile(imagePath, "base64");
      // console.log('Image data:', imageData);

      return imageData;
    } catch (error) {
      console.error("Error converting image to base64:", error);
      setLoading(false);
      throw error;
    }
  };

  // API CALL
  const sendImageToAPI = async (base64Image) => {
    const base64ImageWithPrefix = `data:image/jpeg;base64,${base64Image}`;
    console.log("eqwefwef>>>>", base64ImageWithPrefix);
    try {
      const response = await fetch(
        "https://lenseapi.zinfog.in/api/scan_image",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: base64ImageWithPrefix }),
        }
      );

      const data = await response.json();
      setApiResponseData(data);
      console.log("dsfsdfsdgedesw>>>>", apiResponseData);
      console.log("API Response:", data);
      setLoading(false);
      // Handle the response as needed, e.g., update state with response data
    } catch (error) {
      console.error("Error sending image to API:", error);
      setLoading(false);
    }
  };

  const scanButtonAction = () => {
    setShowModal(false);
    setShowBasicDetailsModal(false);
  };

  const toggleBasicDetailsModal = () => {
    setShowBasicDetailsModal(!showBasicDetailsModal);
  };

  const renderDetailItem = ({ item, index }) => {
    return (
      <View>
        <View
          style={{
            height: responsiveHeight(50),
            width: responsiveWidth(80),
            backgroundColor: Colors.WHITE_COLOR,
            marginLeft: responsiveHeight(1),
          }}
        >
          <Image source={item.image} style={styles.imageStyle} />
          <View
            style={{
              position: "absolute",
              left: responsiveHeight(15),
              top: responsiveHeight(3),
              // flexDirection:'row'
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.detailText}>SKU</Text>
              <Text style={styles.valueText}>:{item.SKU}</Text>
            </View>

            <View
              style={{ flexDirection: "row", marginTop: responsiveHeight(2) }}
            >
              <Text style={styles.detailText}>MRP</Text>
              <Text style={[styles.valueText, { fontWeight: "800" }]}>
                :{item.MRP}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", marginTop: responsiveHeight(2) }}
            >
              <Text style={styles.detailText}>Category</Text>
              <Text style={styles.valueText}>:{item.Category}</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: responsiveHeight(2),
              }}
            >
              <Text style={styles.detailText}>Gross weight</Text>
              <Text style={styles.valueText}>:{item.GrossWeight}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: responsiveHeight(2),
              }}
            >
              <Text style={styles.detailText}>Dimond weight</Text>
              <Text style={styles.valueText}>:{item.DimondWeight}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: responsiveHeight(2),
              }}
            >
              <Text style={styles.detailText}>Dimond No</Text>
              <Text style={styles.valueText}>:{item.DimondNo}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: responsiveHeight(2),
              }}
            >
              <Text style={styles.detailText}>Otherstone {"\n"}Weight</Text>
              <Text style={styles.valueText}> :{item.OtherStoneWeight}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: responsiveHeight(2),
              }}
            >
              <Text style={styles.detailText}>Otherstone No</Text>
              <Text style={styles.valueText}>:{item.OtherstoneNo}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: responsiveHeight(2),
              }}
            >
              <Text style={styles.detailText}>Otherstone{"\n"} Name</Text>
              <Text style={styles.valueText}>:{item.OtherStoneName}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const renderItem = ({ item, index }) => {
    return (
      <View>
        <View
          style={{
            height: responsiveHeight(16),
            width: responsiveWidth(80),
            backgroundColor: Colors.WHITE_COLOR,
            marginLeft: responsiveHeight(1),
            marginTop: responsiveHeight(5),
            borderBottomWidth: responsiveWidth(0.1),
            borderBottomColor: "grey",
          }}
        >
          <Image source={item.image} style={styles.imageStyle} />
          {/* <Image source={photoData} style={styles.imageStyle} /> */}
          <View
            style={{
              position: "absolute",
              left: responsiveHeight(15),
              top: responsiveHeight(3),
              // flexDirection:'row'
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.detailText}>SKU</Text>
              <Text style={styles.valueText}>:{item.SKU}</Text>
            </View>

            <View
              style={{ flexDirection: "row", marginTop: responsiveHeight(2) }}
            >
              <Text style={styles.detailText}>MRP</Text>
              <Text style={styles.valueText}> :{item.MRP}</Text>
            </View>
            <View
              style={{ flexDirection: "row", marginTop: responsiveHeight(2) }}
            >
              <Text style={styles.detailText}>Category</Text>
              <Text style={styles.valueText}> :{item.Category}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo
      />
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Image source={Images.CLOSE_ICON} style={styles.closeIcon} />
        <Text style={styles.closeButtonText}>Cancel</Text>
      </TouchableOpacity>

      <View style={styles.focusMode}>
        <Image source={Images.LEFT_UP_BRACKET} />
        <Image source={Images.RIGHT_UP_BRACKET} />
      </View>
      <View style={styles.focusMode1}>
        <Image source={Images.LEFT_DOWN_BRACKET} />
        <Image source={Images.RIGHT_DOWN_BRACKET} />
      </View>

      <TouchableOpacity
        style={styles.clickButton}
        onPress={() => takePicture()}
      >
        <Image source={Images.FLASH_ICON} />
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.BUTTON_COLOR} />
      ) : apiResponseData?.status === "Failed" ? (
        <View style={{ alignItems: "center", marginTop: responsiveHeight(3) }}>
          <Text style={{ color: "red" }}>{apiResponseData.message}</Text>
        </View>
      ) : (
        <RNModal
          visible={showModal}
          transparent={true}
          animationType="slide"
          onRequestClose={closeModal}
        >
          <View
            style={{
              // height: data.length>2?responsiveHeight(50):responsiveHeight(30),
              height: responsiveHeight(30),
              width: responsiveWidth(94),
              justifyContent: "center",
              backgroundColor: Colors.WHITE_COLOR,
              // marginTop: data.length>2?responsiveHeight(50):responsiveHeight(68),
              marginTop: responsiveHeight(68),
              borderRadius: responsiveHeight(2),
              marginHorizontal: responsiveHeight(1),
            }}
          >
            <FlatList
              data={dummyDetail}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              ref={flatListRef}
              // scrollEnabled={false}
            />
            <TouchableOpacity
              onPress={() => toggleBasicDetailsModal()}
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                marginHorizontal: responsiveHeight(2),
              }}
            >
              {/* <Text style={{color: Colors.VIEW_DETAIL_COLOR, marginTop: 55}}>
              {showDetails ? 'Hide Details' : 'View Details'}
            </Text> */}
              <Text
                style={{
                  color: Colors.VIEW_DETAIL_COLOR,
                  marginBottom: responsiveHeight(1),
                  fontFamily: Font.INTER_REGULAR,
                }}
              >
                View Details
              </Text>
              <Image
                source={Images.DOWN_ARROW_IMAGE}
                style={{ marginTop: responsiveHeight(1) }}
              />
            </TouchableOpacity>
          </View>
        </RNModal>
      )}

      {/* BASIC DETAIL MODAL */}

      <RNModal
        visible={showBasicDetailsModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowBasicDetailsModal(false)}
      >
        <View
          style={{
            height: responsiveHeight(65),
            justifyContent: "center",
            backgroundColor: Colors.WHITE_COLOR,
            marginTop: responsiveHeight(35),
            borderRadius: responsiveHeight(2),
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontSize: responsiveFontSize(2.5),
                color: Colors.BLACK_COLOR,
                marginHorizontal: responsiveHeight(2),
                fontFamily: Font.INTER_REGULAR,
              }}
            >
              Basic Details
            </Text>
            <TouchableOpacity onPress={() => setShowBasicDetailsModal(false)}>
              <Image
                source={Images.UPARROW_IMAGE}
                style={{
                  marginHorizontal: responsiveHeight(2),
                  marginTop: responsiveHeight(1),
                }}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={dummyDetail}
            renderItem={renderDetailItem}
            keyExtractor={(item) => item.id}
            ref={flatListRef}
            scrollEnabled={false}
          />
          <View
            style={{
              marginBottom: responsiveHeight(2),
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Text
              style={{
                fontSize: responsiveFontSize(1.5),
                color: Colors.VIEW_DETAIL_COLOR,
                fontFamily: Font.INTER_REGULAR,
                marginTop: responsiveHeight(1.2),
              }}
            >
              This is not what i am looking for
            </Text>
            <TouchableOpacity
              style={{
                height: responsiveHeight(5),
                width: responsiveWidth(25),
                backgroundColor: Colors.VIEW_DETAIL_COLOR,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: responsiveHeight(5),
              }}
              onPress={() => scanButtonAction()}
            >
              <Text
                style={{
                  color: Colors.WHITE_COLOR,
                  fontSize: responsiveFontSize(1.3),
                }}
              >
                SCAN NEXT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </RNModal>
    </View>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cancelButton: {
    height: responsiveHeight(4),
    width: responsiveWidth(25),
    backgroundColor: Colors.GREY_COLOR,
    borderRadius: responsiveHeight(5),
    flexDirection: "row",
    marginHorizontal: responsiveHeight(32),
    marginTop: responsiveHeight(12),
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    marginLeft: responsiveHeight(1),
  },
  focusMode: {
    justifyContent: "space-between",
    marginTop: responsiveHeight(5),
    flexDirection: "row",
    marginHorizontal: responsiveHeight(6),
  },
  focusMode1: {
    justifyContent: "space-between",
    marginTop: responsiveHeight(35),
    flexDirection: "row",
    marginHorizontal: responsiveHeight(6),
  },
  clickButton: {
    height: responsiveHeight(8),
    width: responsiveWidth(16),
    backgroundColor: Colors.GREY_COLOR,
    borderRadius: responsiveHeight(7),
    marginTop: responsiveHeight(10),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  flatListContainer: {
    height: responsiveHeight(50),
    width: responsiveWidth(80),
    backgroundColor: "red",
    marginLeft: responsiveHeight(1),
    marginTop: responsiveHeight(5),
  },
  imageStyle: {
    height: responsiveHeight(9),
    width: responsiveWidth(25),
    borderRadius: 10,
    marginTop: responsiveHeight(3),
    marginLeft: responsiveHeight(1),
  },
  detailText: {
    color: Colors.TEXT_COLOR,
    fontSize: responsiveFontSize(1.6),
    fontFamily: Font.INTER_SEMI_BOLD,
    // marginTop:responsiveHeight(2)
  },
  valueText: {
    color: Colors.BLACK_COLOR,
    fontSize: responsiveFontSize(1.6),
    fontFamily: Font.INTER_SEMI_BOLD,
    position: "absolute",
    left: responsiveHeight(15),
  },
});
