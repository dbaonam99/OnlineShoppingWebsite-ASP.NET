using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using OnlineShop.Models;
using OnlineShop.Services;


namespace OnlineShop
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        } 


        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<ProductDatabaseSettings>(
             Configuration.GetSection(nameof(ProductDatabaseSettings)));

            services.AddSingleton<IProductDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<ProductDatabaseSettings>>().Value);
            services.AddSingleton<ProductService>();

            ////////////////////////////////////////
            services.Configure<NewsDatabaseSettings>(
             Configuration.GetSection(nameof(NewsDatabaseSettings)));

            services.AddSingleton<INewsDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<NewsDatabaseSettings>>().Value);
            services.AddSingleton<NewsService>();

            ////////////////////////////////////////
            services.Configure<UserDatabaseSettings>(
             Configuration.GetSection(nameof(UserDatabaseSettings)));

            services.AddSingleton<IUserDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<UserDatabaseSettings>>().Value);
            services.AddSingleton<UserService>();

            ////////////////////////////////////////
            services.Configure<VietnamDatabaseSettings>(
             Configuration.GetSection(nameof(VietnamDatabaseSettings)));

            services.AddSingleton<IVietnamDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<VietnamDatabaseSettings>>().Value);
            services.AddSingleton<VietnamService>();

            ////////////////////////////////////////
            services.Configure<OrderDatabaseSettings>(
             Configuration.GetSection(nameof(OrderDatabaseSettings)));

            services.AddSingleton<IOrderDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<OrderDatabaseSettings>>().Value);
            services.AddSingleton<OrderService>();

            ////////////////////////////////////////
            services.Configure<CollectionDatabaseSettings>(
             Configuration.GetSection(nameof(CollectionDatabaseSettings)));

            services.AddSingleton<ICollectionDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<CollectionDatabaseSettings>>().Value);
            services.AddSingleton<CollectionService>();

            ////////////////////////////////////////
            services.Configure<SubscriberDatabaseSettings>(
             Configuration.GetSection(nameof(SubscriberDatabaseSettings)));

            services.AddSingleton<ISubscriberDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<SubscriberDatabaseSettings>>().Value);
            services.AddSingleton<SubscriberService>();

            ////////////////////////////////////////
            services.Configure<TodoDatabaseSettings>(
             Configuration.GetSection(nameof(TodoDatabaseSettings)));

            services.AddSingleton<ITodoDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<TodoDatabaseSettings>>().Value);
            services.AddSingleton<TodoService>();

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "OnlineShop", Version = "v1" });
            }); 
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "OnlineShop v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(builder =>
            {
                builder.WithOrigins("http://localhost:3000", "http://localhost:4000");
                builder.AllowAnyMethod();
                builder.AllowAnyHeader();
            });
            app.UseStaticFiles();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
