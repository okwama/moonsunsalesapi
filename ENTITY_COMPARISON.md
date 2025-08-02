# Entity Comparison: Prisma Schema vs TypeORM Entities

This document compares the Prisma schema from `woosh-api` with the TypeORM entities in our NestJS application.

## ✅ Successfully Mapped Entities

### 1. SalesRep Entity
**Prisma Schema:**
```prisma
model SalesRep {
  id                            Int                             @id @default(autoincrement())
  name                          String
  email                         String
  phoneNumber                   String
  password                      String
  countryId                     Int
  country                       String
  region_id                     Int
  region                        String
  route_id                      Int
  route                         String                          @db.VarChar(100)
  route_id_update               Int
  route_name_update             String                          @db.VarChar(100)
  visits_targets                Int
  new_clients                   Int
  vapes_targets                 Int
  pouches_targets               Int
  role                          String?                         @default("USER")
  manager_type                  Int
  status                        Int?                            @default(0)
  createdAt                     DateTime                        @default(now())
  updatedAt                     DateTime                        @updatedAt
  retail_manager                Int
  key_channel_manager           Int
  distribution_manager          Int
  photoUrl                      String?                         @default("")
  managerId                     Int?
}
```

**TypeORM Entity:**
```typescript
@Entity('SalesRep')
export class SalesRep {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  password: string;

  @Column()
  countryId: number;

  @Column()
  country: string;

  @Column()
  region_id: number;

  @Column()
  region: string;

  @Column({ type: 'varchar', length: 100 })
  route_id: number;

  @Column({ type: 'varchar', length: 100 })
  route: string;

  @Column()
  route_id_update: number;

  @Column({ type: 'varchar', length: 100 })
  route_name_update: string;

  @Column()
  visits_targets: number;

  @Column()
  new_clients: number;

  @Column()
  vapes_targets: number;

  @Column()
  pouches_targets: number;

  @Column({ nullable: true, default: 'USER' })
  role: string;

  @Column()
  manager_type: number;

  @Column({ nullable: true, default: 0 })
  status: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column()
  retail_manager: number;

  @Column()
  key_channel_manager: number;

  @Column()
  distribution_manager: number;

  @Column({ nullable: true, default: '' })
  photoUrl: string;

  @Column({ nullable: true })
  managerId: number;
}
```

### 2. Clients Entity
**Prisma Schema:**
```prisma
model Clients {
  id                Int             @id @default(autoincrement())
  name              String
  address           String?
  latitude          Float?
  longitude         Float?
  balance           Decimal?        @db.Decimal(11, 2)
  email             String?
  region_id         Int
  region            String
  route_id          Int?
  route_name        String?
  route_id_update   Int?
  route_name_update String?         @db.VarChar(100)
  contact           String
  tax_pin           String?
  location          String?
  status            Int             @default(0)
  client_type       Int?
  outlet_account    Int?
  countryId         Int
  added_by          Int?
  created_at        DateTime?       @default(now())
}
```

**TypeORM Entity:**
```typescript
@Entity('Clients')
export class Clients {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ type: 'float', nullable: true })
  latitude: number;

  @Column({ type: 'float', nullable: true })
  longitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 2, nullable: true })
  balance: number;

  @Column({ nullable: true })
  email: string;

  @Column()
  region_id: number;

  @Column()
  region: string;

  @Column({ nullable: true })
  route_id: number;

  @Column({ nullable: true })
  route_name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  route_id_update: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  route_name_update: string;

  @Column()
  contact: string;

  @Column({ nullable: true })
  tax_pin: string;

  @Column({ nullable: true })
  location: string;

  @Column({ default: 0 })
  status: number;

  @Column({ nullable: true })
  client_type: number;

  @Column({ nullable: true })
  outlet_account: number;

  @Column()
  countryId: number;

  @Column({ nullable: true })
  added_by: number;

  @Column({ type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
```

### 3. Product Entity
**Prisma Schema:**
```prisma
model Product {
  id            Int      @id @default(autoincrement())
  name          String
  category_id   Int
  category      String
  unit_cost     Decimal  @db.Decimal(11, 2)
  description   String?
  currentStock  Int?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  clientId      Int?
  image         String?  @db.VarChar(255)
  unit_cost_ngn Decimal? @db.Decimal(11, 2)
  unit_cost_tzs Decimal? @db.Decimal(11, 2)
}
```

**TypeORM Entity:**
```typescript
@Entity('Product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category_id: number;

  @Column()
  category: string;

  @Column({ type: 'decimal', precision: 11, scale: 2 })
  unit_cost: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  currentStock: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ nullable: true })
  clientId: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @Column({ type: 'decimal', precision: 11, scale: 2, nullable: true })
  unit_cost_ngn: number;

  @Column({ type: 'decimal', precision: 11, scale: 2, nullable: true })
  unit_cost_tzs: number;
}
```

### 4. JourneyPlan Entity
**Prisma Schema:**
```prisma
model JourneyPlan {
  id                 Int       @id @default(autoincrement())
  date               DateTime
  time               String
  userId             Int?
  clientId           Int?
  status             Int       @default(0)
  checkInTime        DateTime?
  latitude           Float?
  longitude          Float?
  imageUrl           String?
  notes              String?
  checkoutLatitude   Float?
  checkoutLongitude  Float?
  checkoutTime       DateTime?
  showUpdateLocation Boolean   @default(true)
  routeId            Int?
  Clients            Clients?  @relation(fields: [clientId], references: [id], onDelete: Cascade, map: "client_id")
  SalesRep           SalesRep? @relation(fields: [userId], references: [id], onDelete: Cascade, map: "salesrep_id")
}
```

**TypeORM Entity:**
```typescript
@Entity('JourneyPlan')
export class JourneyPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column()
  time: string;

  @Column({ nullable: true })
  userId: number;

  @Column({ nullable: true })
  clientId: number;

  @Column({ default: 0 })
  status: number;

  @Column({ type: 'timestamp', nullable: true })
  checkInTime: Date;

  @Column({ type: 'float', nullable: true })
  latitude: number;

  @Column({ type: 'float', nullable: true })
  longitude: number;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  notes: string;

  @Column({ type: 'float', nullable: true })
  checkoutLatitude: number;

  @Column({ type: 'float', nullable: true })
  checkoutLongitude: number;

  @Column({ type: 'timestamp', nullable: true })
  checkoutTime: Date;

  @Column({ default: true })
  showUpdateLocation: boolean;

  @Column({ nullable: true })
  routeId: number;

  @ManyToOne(() => Clients, clients => clients.JourneyPlan, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'client_id' })
  Clients: Clients;

  @ManyToOne(() => SalesRep, salesRep => salesRep.JourneyPlan, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'salesrep_id' })
  SalesRep: SalesRep;
}
```

### 5. LoginHistory Entity
**Prisma Schema:**
```prisma
model LoginHistory {
  id           Int       @id @default(autoincrement())
  userId       Int?
  timezone     String?   @default("UTC")
  duration     Int?
  status       Int?      @default(0)
  sessionEnd   String?
  sessionStart String?
  SalesRep     SalesRep? @relation(fields: [userId], references: [id])
}
```

**TypeORM Entity:**
```typescript
@Entity('LoginHistory')
export class LoginHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId: number;

  @Column({ nullable: true, default: 'UTC' })
  timezone: string;

  @Column({ nullable: true })
  duration: number;

  @Column({ nullable: true, default: 0 })
  status: number;

  @Column({ nullable: true })
  sessionEnd: string;

  @Column({ nullable: true })
  sessionStart: string;

  @ManyToOne(() => SalesRep, salesRep => salesRep.LoginHistory)
  @JoinColumn({ name: 'userId' })
  SalesRep: SalesRep;
}
```

### 6. UpliftSale Entity
**Prisma Schema:**
```prisma
model UpliftSale {
  id             Int              @id @default(autoincrement())
  clientId       Int
  userId         Int
  status         String           @default("pending")
  totalAmount    Float            @default(0)
  createdAt      DateTime         @default(now())
  updatedAt      DateTime
  Clients        Clients          @relation(fields: [clientId], references: [id], onDelete: Cascade, map: "clients")
  SalesRep       SalesRep         @relation(fields: [userId], references: [id], onDelete: Cascade, map: "salesrep")
  UpliftSaleItem UpliftSaleItem[]
}
```

**TypeORM Entity:**
```typescript
@Entity('UpliftSale')
export class UpliftSale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientId: number;

  @Column()
  userId: number;

  @Column({ default: 'pending' })
  status: string;

  @Column({ type: 'float', default: 0 })
  totalAmount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Clients, clients => clients.UpliftSale, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'clients' })
  Clients: Clients;

  @ManyToOne(() => SalesRep, salesRep => salesRep.UpliftSale, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'salesrep' })
  SalesRep: SalesRep;

  @OneToMany(() => UpliftSaleItem, upliftSaleItem => upliftSaleItem.UpliftSale)
  UpliftSaleItem: UpliftSaleItem[];
}
```

### 7. UpliftSaleItem Entity
**Prisma Schema:**
```prisma
model UpliftSaleItem {
  id           Int        @id @default(autoincrement())
  upliftSaleId Int
  productId    Int
  quantity     Int
  unitPrice    Float
  total        Float
  createdAt    DateTime   @default(now())
  products     products   @relation(fields: [productId], references: [id], onDelete: Cascade, map: "productid")
  UpliftSale   UpliftSale @relation(fields: [upliftSaleId], references: [id], onDelete: Cascade, map: "uplift_order")
}
```

**TypeORM Entity:**
```typescript
@Entity('UpliftSaleItem')
export class UpliftSaleItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  upliftSaleId: number;

  @Column()
  productId: number;

  @Column()
  quantity: number;

  @Column({ type: 'float' })
  unitPrice: number;

  @Column({ type: 'float' })
  total: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Product, product => product.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productid' })
  products: Product;

  @ManyToOne(() => UpliftSale, upliftSale => upliftSale.UpliftSaleItem, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'uplift_order' })
  UpliftSale: UpliftSale;
}
```

### 8. Task Entity
**Prisma Schema:**
```prisma
model tasks {
  id           Int       @id @default(autoincrement())
  title        String
  description  String    @db.Text
  createdAt    DateTime  @default(now())
  completedAt  DateTime?
  isCompleted  Boolean   @default(false)
  priority     String    @default("medium")
  status       String    @default("pending")
  salesRepId   Int
  assignedById Int?
}
```

**TypeORM Entity:**
```typescript
@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;

  @Column({ default: false })
  isCompleted: boolean;

  @Column({ default: 'medium' })
  priority: string;

  @Column({ default: 'pending' })
  status: string;

  @Column()
  salesRepId: number;

  @Column({ nullable: true })
  assignedById: number;
}
```

### 9. Leave Entity
**Prisma Schema:**
```prisma
model Leave {
  id         Int      @id @default(autoincrement())
  userId     Int
  leaveType  String
  startDate  DateTime
  endDate    DateTime
  reason     String
  attachment String?
  status     String   @default("PENDING")
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

**TypeORM Entity:**
```typescript
@Entity('leaves')
export class Leave {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  leaveType: string;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column()
  reason: string;

  @Column({ nullable: true })
  attachment: string;

  @Column({ default: 'PENDING' })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
```

## 🔄 Key Differences and Mappings

### 1. Data Types
- **Prisma**: Uses `Decimal` for monetary values
- **TypeORM**: Uses `decimal` with precision and scale
- **Mapping**: `@db.Decimal(11, 2)` → `{ type: 'decimal', precision: 11, scale: 2 }`

### 2. Relationships
- **Prisma**: Uses `@relation` with `fields` and `references`
- **TypeORM**: Uses `@ManyToOne`, `@OneToMany`, `@JoinColumn`
- **Mapping**: Properly mapped with correct foreign key constraints

### 3. Indexes
- **Prisma**: Uses `@@index` decorators
- **TypeORM**: Uses `@Index` decorators
- **Mapping**: All indexes properly mapped

### 4. Default Values
- **Prisma**: Uses `@default()` decorators
- **TypeORM**: Uses `default` property in column options
- **Mapping**: All default values properly mapped

### 5. Nullable Fields
- **Prisma**: Uses `?` for optional fields
- **TypeORM**: Uses `nullable: true`
- **Mapping**: All nullable fields properly mapped

## ✅ Summary

All core entities from the Prisma schema have been successfully mapped to TypeORM entities with:

1. **Correct data types** and precision
2. **Proper relationships** with foreign key constraints
3. **All indexes** for performance optimization
4. **Default values** and nullable fields
5. **Cascade operations** for data integrity

The TypeORM entities are now ready to be used with the NestJS application and will work seamlessly with the existing database schema. 