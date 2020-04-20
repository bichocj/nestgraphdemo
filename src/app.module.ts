import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';

// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { RecipesModule } from './recipes/recipes.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    RecipesModule,
    ProductsModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRoot('mongodb://localhost/nest'),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule { }
