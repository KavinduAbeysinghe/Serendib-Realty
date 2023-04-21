import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import axiosInstance from "../config/axiosInstance";

interface Props {
  show: boolean;
  onHide: () => void;
  userId: number;
  isUpdateClicked: boolean;
  propertyObj: any;
}

interface Property {
  agentId: number;
  propertyId: number;
  propertyType: string;
  noOfBedRooms: number;
  noOfBathrooms: number;
  propertyLocation: string;
  propertyPrice: number;
  propertyDescription: string;
  propertyImgURL: string;
}

const Model = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<Property>();

  const onSubmit = (property: Property) => {
    console.log(property);
    if (!props.isUpdateClicked) {
      axiosInstance
        .post("/properties", {
          agentId: property.agentId,
          propertyType: property.propertyType,
          noOfBedRooms: property.noOfBedRooms,
          noOfBathrooms: property.noOfBathrooms,
          propertyLocation: property.propertyLocation,
          propertyPrice: property.propertyPrice,
          propertyDescription: property.propertyDescription,
          propertyImgURL: property.propertyImgURL,
        })
        .then((res) => {
          // console.log(res.data);
          alert(res.data);
        })
        .catch((error) => console.log(error.response.data));
    } else {
      axiosInstance
        .put(`/properties/${props.propertyObj.propertyId}`, {
          propertyType: property.propertyType,
          noOfBedRooms: property.noOfBedRooms,
          noOfBathrooms: property.noOfBathrooms,
          propertyLocation: property.propertyLocation,
          propertyPrice: property.propertyPrice,
          propertyDescription: property.propertyDescription,
          propertyImgURL: property.propertyImgURL,
        })
        .then((res) => {
          // console.log(res.data);
          alert(res.data);
        })
        .catch((error) => console.log(error.response.data));
    }

    reset();
  };

  useEffect(() => {
    reset();
  }, [props.show, props.onHide]);

  return (
    <Modal show={props.show} onHide={props.onHide} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>
          {props.isUpdateClicked ? "Update Property" : "Add New Property"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Agent ID</Form.Label>
            <Form.Control
              type="number"
              value={props.userId}
              {...register("agentId", { valueAsNumber: true })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Property Type</Form.Label>
            <Form.Control
              defaultValue={
                props.isUpdateClicked ? props.propertyObj.propertyType : ""
              }
              type="text"
              placeholder="Property Type"
              {...register("propertyType", {
                required: "Property type required",
              })}
              onKeyUp={() => trigger("propertyType")}
            />
            {errors.propertyType && (
              <small className="text-danger">
                {errors.propertyType.message}
              </small>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Property Description</Form.Label>
            <Form.Control
              defaultValue={
                props.isUpdateClicked
                  ? props.propertyObj.propertyDescription
                  : ""
              }
              type="text"
              placeholder="Set a brief description for the property"
              {...register("propertyDescription", {
                required: "Property description required",
              })}
              onKeyUp={() => trigger("propertyDescription")}
            />
            {errors.propertyDescription && (
              <small className="text-danger">
                {errors.propertyDescription.message}
              </small>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Num of bedrooms</Form.Label>
            <Form.Control
              defaultValue={
                props.isUpdateClicked ? props.propertyObj.noOfBedRooms : ""
              }
              type="number"
              placeholder="Set number of bedrooms"
              {...register("noOfBedRooms", {
                required: "Number of bedrooms required",
                valueAsNumber: true,
              })}
              onKeyUp={() => trigger("noOfBedRooms")}
            />
            {errors.noOfBedRooms && (
              <small className="text-danger">
                {errors.noOfBedRooms.message}
              </small>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Num of bathrooms</Form.Label>
            <Form.Control
              defaultValue={
                props.isUpdateClicked ? props.propertyObj.noOfBathrooms : ""
              }
              type="number"
              placeholder="Set number of bathrooms"
              {...register("noOfBathrooms", {
                required: "Number of bathrooms required",
                valueAsNumber: true,
              })}
              onKeyUp={() => trigger("noOfBathrooms")}
            />
            {errors.noOfBathrooms && (
              <small className="text-danger">
                {errors.noOfBathrooms.message}
              </small>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Property Location</Form.Label>
            <Form.Control
              defaultValue={
                props.isUpdateClicked ? props.propertyObj.propertyLocation : ""
              }
              type="text"
              placeholder="Set property location"
              {...register("propertyLocation", {
                required: "Property location required",
              })}
              onKeyUp={() => trigger("propertyLocation")}
            />
            {errors.propertyLocation && (
              <small className="text-danger">
                {errors.propertyLocation.message}
              </small>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Property Price</Form.Label>
            <Form.Control
              defaultValue={
                props.isUpdateClicked ? props.propertyObj.propertyPrice : ""
              }
              type="number"
              placeholder="Set a price for the property"
              {...register("propertyPrice", {
                required: "Property price required",
                valueAsNumber: true,
              })}
              onKeyUp={() => trigger("propertyPrice")}
            />
            {errors.propertyPrice && (
              <small className="text-danger">
                {errors.propertyPrice.message}
              </small>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              defaultValue={
                props.isUpdateClicked ? props.propertyObj.propertyImgURL : ""
              }
              type="text"
              placeholder="Set the URL for the property image"
              {...register("propertyImgURL", {
                required: "Property img url required",
              })}
              onKeyUp={() => trigger("propertyImgURL")}
            />
            {errors.propertyImgURL && (
              <small className="text-danger">
                {errors.propertyImgURL.message}
              </small>
            )}
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Confirm
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Model;
