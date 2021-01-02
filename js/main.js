$(document).ready(function()
{
  $('#load-more-content').click(function()
  {
    
    $('#more-content').toggleClass('shown');

    $('#load-more-content').hide();


    if( $('#more-content').hasClass('shown') )
    {
      $('#load-more-content').hide();//text('Hide content');
      $('#more-content').fadeIn('slow', function()
      {
        $('#load-more-content').fadeOut('slow');
      });
    }
   /*else
    {
      $('#load-more-content').hide()//text("Let's Start");
      $('#more-content').fadeOut('slow', function()
      {
        $('#load-more-content').fadeOut('slow');
      });
    }*/
  });
});