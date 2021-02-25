###### Reponsitories BackEnd : https://github.com/huutri220820/NT208

###### Reponsitories FrontEnd : https://github.com/VTV24/my-book-store

### A. Giới thiệu:

Đây là đồ án môn NT208 - Lập trình ứng dụng web

**Các công nghệ sử dụng **

- ReactJS Typescript : thư viện front end dùng để tạo ứng dụng web phía client 
  Xem thêm tại : https://reactjs.org/

- Axios : là một HTTP client được viết dựa trên Promises được dùng để hỗ trợ cho việc xây dựng các ứng dụng API từ đơn giản đến phức tạp và có thể được sử dụng cả ở trình duyệt hay Node.js.

  Xem thêm tại : https://www.npmjs.com/package/axios

- Redux/Redux Toolkit : là một thư viện Javascript giúp tạo ra thành một lớp quản lý trạng thái của ứng dụng.

  Xem thêm tại : https://redux.js.org/,  https://redux-toolkit.js.org/

- Taildwind css :  Tailwind là một tập hợp các lớp tiện ích (class) cấp thấp. Chúng có thể được sử dụng như những viên gạch lego để xây dựng bất kỳ loại thành phần nào

  Xem thêm tại : https://tailwindcss.com/

### B. Hướng dẫn cài đặt 

**Yêu cầu hệ thống**

1. Hệ điều hành : Windows, Linux, Ubuntu, MacOS 
2. Môi trường Nodejs cài đặt tại : https://nodejs.org/en/
3. Công cụ hỗ trợ cài đặt các gói js npm : cài đặt kèm theo nodejs

**Các bước cài đặt**

1. Clone backend repo tại đường dẫn : https://github.com/huutri220820/NT208 và cài đặt dựa theo hướng dẫn ở đó

2. Clone repo này : 

   Nếu sử dụng git client : Mở CMD, Terminal hoặc Powershell tùy theo hệ điều hành

   > git clone https://github.com/HrqstnElq/my-book-store.git

   Nếu không sử dụng git : dowload file zip của repo tại https://github.com/HrqstnElq/my-book-store

3.  Cài đặt các pakage cần thiết 

   Mở hoặc điều hướng cmd đến thư mục my-book-store 

   > npm install 

4. Chạy chương trình

   > npm run start 

   Sau đó truy cập vào đường dẫn http://localhost:3000 

**Note** : nếu server chạy trên port khác 5000 vui lòng truy cập vào .env và sửa lại đường dẫn tương ứng



**Nếu bạn muốn đăng nhập vui lòng sử dụng những tài khoản sau :** 

username : user, password : 1 (role user)

username : admin, password : 1 (role admin)

username : sales, password : 1 (role sales)

### C. Cấu trúc thư mục 

src 

├───api - chứa các api gọi đến server gửi và lấy dữ liệu

├───assets  - chứa các tập tin css, image

│   ├───images 

│   │   ├───admin

│   │   └───public

│   │       └───banner

│   └───styles - chứa các tập tin css 

├───common - chứa các hàm dùng thường xuyên được sử dụng 

├───components  - chứa các component/ bên ngoài hai thư mục dưới là dùng chung cho cả hai trang

│   ├───admin - chứa các component của trang admin

│   └───public - chứa các component của trang public

├───pages - chứa các trang web(component chứa các component nhỏ hơn )

│   ├───admin - chứa các trang web của trang admin

│   └───public - chứa các trang web của trang public 

└───store - chứa file cấu hình store của redux 




