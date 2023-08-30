import React, { useState, useEffect } from "react";
import "./myProfile.scss";
import { Button, Form, Input, DatePicker } from "antd";
import { Radio } from "antd";

import userApi from "api/userApi";

export const MyProfile = () => {
  const [value, setValue] = useState("Male");
  const [profile, setProfile] = useState("");

  useEffect(() => {
    userApi
      .getUserProfile()
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setProfile(data.profile);
      });
  }, []);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="my_profile__content">
      <div className="my_profile__content__header">
        <h1>Hồ sơ của tôi</h1>
        <div>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <div className="my_profile__content__body">
        <div className="my_profile__content__body__left">
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >
            <Form.Item label="Tên" name="name" defaultValue="phu2k3">
              <Input defaultValue={profile && profile.name} />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input
                type="password"
                placeholder="Your email"
                outline="none"
                defaultValue={profile && profile.email}
              />
            </Form.Item>
            <Form.Item label="Số điện thoại" name="telephone">
              <Input
                outline="none"
                defaultValue={profile && profile.telephone}
              />
            </Form.Item>
            <Form.Item label="Địa chỉ" name="address">
              <Input type="text" defaulValue={profile && profile.address} />
            </Form.Item>

            <Form.Item label="Giới tính" name="gender">
              <Radio.Group onChange={onChange} value={value}>
                <Radio value={"Male"}>Male</Radio>
                <Radio value={"Female"}>Female</Radio>
                <Radio value={"Other"}>Other</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Ngày sinh" name="birthday">
              <DatePicker defaultValue={profile && profile.birthday} />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "red" }}
              >
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="my_profile__content__body__right">
          <div className="my_profile__content__body__right__wrapper">
            <div className="my_profile__content__body__right__img">
              <img src={profile.avatar_url} alt="avatar" />
            </div>
            <button>Chọn ảnh</button>
          </div>
        </div>
      </div>
    </div>
  );
};
