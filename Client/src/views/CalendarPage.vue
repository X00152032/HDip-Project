<!--Calendar Page -->
<template>
  <div class="Calendar container-fluid">
    <div class="bg-white text-grey" style="text-align: left"> <!--format table-->
        <ol class="ordered-list">
        <h2>Calendar</h2> <hr>
          <div class="calendar">
            <iframe class=iframe src="https://calendar.google.com/calendar/embed?src=straphaelasschool%40gmail.com&ctz=Europe%2FDublin" style="border: 0" width="1000" height="1000" frameborder="0" scrolling="no"></iframe>
          </div>
        </ol>
    </div>
  </div>
</template>

<style scoped>

.calendar {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
}

/* Then style the iframe to fit in the container div with full height and width */
.iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

.calendar {
  text-align:justify;
    margin-top:0px; /*to have the space above the image*/
    margin-bottom:20px; /*to have the space under the image*/
    margin-left:30px; /*to have the space under the image*/
    margin-right:30px; /*to have the space under the image*/
}

p{
  text-align:justify;
  margin-right:30px; /*to have the space under the image*/
}

h2{
  text-align:center
}


.image img{
    width:350px;
    height:420px;
    image-rendering: optimizeSpeed;
    float:right;
    border-radius: 15%;
    margin-top:20px; /*to have the space above the image*/
    margin-bottom:20px; /*to have the space under the image*/
    margin-left:30px; /*to have the space under the image*/
    margin-right:30px; /*to have the space under the image*/
}

</style>