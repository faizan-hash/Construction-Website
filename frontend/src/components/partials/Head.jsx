import React from "react";

const Head = () => {
  return (
    <>
      <meta charSet="utf-8" />
      <title>DASHMIN - Bootstrap Admin Template</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="keywords" content="" />
      <meta name="description" content="" />
      <link href="/assets/img/favicon.ico" rel="icon" />

      {/* Fonts and Icons */}
      <link
        href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
        rel="stylesheet"
      />

      {/* Libraries Styles */}
      <link
        href="/assets/lib/owlcarousel/assets/owl.carousel.min.css"
        rel="stylesheet"
      />
      <link
        href="/assets/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css"
        rel="stylesheet"
      />

      {/* Custom Styles */}
      <link href="/assets/css/bootstrap.min.css" rel="stylesheet" />
      <link href="/assets/css/style.css" rel="stylesheet" />

      {/* Scripts */}
      <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
      <script src="/assets/lib/chart/chart.min.js"></script>
      <script src="/assets/lib/easing/easing.min.js"></script>
      <script src="/assets/lib/waypoints/waypoints.min.js"></script>
      <script src="/assets/lib/owlcarousel/owl.carousel.min.js"></script>
      <script src="/assets/lib/tempusdominus/js/moment.min.js"></script>
      <script src="/assets/lib/tempusdominus/js/moment-timezone.min.js"></script>
      <script src="/assets/lib/tempusdominus/js/tempusdominus-bootstrap-4.min.js"></script>
      <script src="/assets/js/main.js"></script>
    </>
  );
};

export default Head;
