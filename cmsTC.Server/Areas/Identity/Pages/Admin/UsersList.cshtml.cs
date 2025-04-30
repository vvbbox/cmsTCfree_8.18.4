//using cmsTC.Server.Areas.Identity.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TutoCito.cmsTCapi.api.Data;
using Microsoft.AspNetCore.Authorization;

namespace cmsTC.Server.Areas.Identity.Pages.Admin
{
    [Authorize(Policy = "Admin")]
    public class UsersListModel : PageModel
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UsersListModel(ApplicationDbContext context, UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public required List<dynamic> Users { get; set; } // Используем dynamic для удобства

        public async Task OnGetAsync()
        {
            Users = new List<dynamic>();

            var users = _context.Users.ToList(); // Получаем всех пользователей из базы данных
            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user); // Получаем роли пользователя
                var emailConfirmed = await _userManager.IsEmailConfirmedAsync(user); // Проверяем подтверждение email

                Users.Add(new
                {
                    Name = user.UserName,
                    Email = user.Email,
                    Role = roles.FirstOrDefault() ?? "No Role", // Если роль отсутствует, выводим "No Role"
                    IsEmailConfirmed = emailConfirmed
                });
            }
        }
    }
}