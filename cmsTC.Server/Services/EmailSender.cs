using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Identity.UI.Services;


namespace cmsTC.Server.Services
{
    public class EmailSender : IEmailSender
{
    public EmailSettings _emailSettings { get; }

        public EmailSender(IOptions<EmailSettings> emailSettings)
        {
            _emailSettings = emailSettings.Value;
        }
    public async Task SendEmailAsync(string email, string subject, string message)
    {
        try
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("TutoCito.com Administration", _emailSettings.From));
            emailMessage.To.Add(new MailboxAddress("", email));
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = message
            };

            using (var client = new MailKit.Net.Smtp.SmtpClient())
            {
                client.Timeout = (int)TimeSpan.FromSeconds(15).TotalMilliseconds;
                await client.ConnectAsync(_emailSettings.Host, _emailSettings.Port, true);
                await client.AuthenticateAsync(_emailSettings.Username, _emailSettings.Password);
                await client.SendAsync(emailMessage);

                await client.DisconnectAsync(true);
            }
        }
        catch (Exception e)
        {
            Console.WriteLine("Ошибка при отправке почты" + e.Message);
        }
    }
}

public class EmailSettings
{
    public string? From { get; set; }
    public string? Username { get; set; }
    public string? Password { get; set; }
    public string? Host { get; set; }
    public int Port { get; set; }
}
}



/*
namespace cmsTC.Server
{
    public class EmailSender : IEmailSender
    {
        public async Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            using var emailMessage = new MimeMessage();
 
            emailMessage.From.Add(new MailboxAddress("Администрация сайта", "vvb54@mail.ru"));
            emailMessage.To.Add(new MailboxAddress("", email));
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = htmlMessage
            };
             
            using (var client = new SmtpClient())
            {
                await client.ConnectAsync("smtp.mail.ru", 465, SecureSocketOptions.StartTls);
                await client.AuthenticateAsync("vvb54@mail.ru", "8UL3HuHGDyd9hKzw6Jw9");
                await client.SendAsync(emailMessage);
 
                await client.DisconnectAsync(true);
                //client.Dispose();
            }
        }
    }
}

*/