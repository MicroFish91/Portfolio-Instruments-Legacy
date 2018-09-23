# sequelize model:generate --name Accounts \
# --attributes holdingLocation:string,accountType:string,moneyMarket:decimal

# sequelize model:generate --name Stocks \
# --attributes tsm:decimal,d_lcb:decimal,d_lcv:decimal,d_lcg:decimal,d_mcb:decimal,d_mcv:decimal,d_mcg:decimal,d_scb:decimal,d_scv:decimal,d_scg:decimal,i_lcb:decimal,i_lcv:decimal,i_lcg:decimal,i_mcb:decimal,i_mcv:decimal,i_mcg:decimal,i_scb:decimal,i_scv:decimal,i_scg:decimal

# sequelize model:generate --name Fixed_Income \
# --attributes ltb:decimal,itb:decimal,stb:decimal,bills:decimal

# sequelize model:generate --name Real_Assets \
# --attributes commodoties:decimal,gold:decimal,reits:decimal

# sequelize migration:create --name stockIdToAccounts

# sequelize migration:create --name fixedIncomeIdToAccounts

# sequelize migration:create --name realAssetsIdToAccounts

# sequelize migration:create --name accountsIdToStocks

# sequelize migration:create --name accountsIdToFixedIncome

# sequelize migration:create --name accountsIdToRealAssets